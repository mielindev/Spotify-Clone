import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const initalizeAuth = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error: any) {
        console.log("Error in initalizeAuth", error);
      } finally {
        setLoading(false);
      }
    };

    initalizeAuth();
  }, [getToken]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin size-8 text-emerald-500" />
      </div>
    );
  return <>{children}</>;
};

export default AuthProvider;
