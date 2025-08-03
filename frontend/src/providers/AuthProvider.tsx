import { axiosInstance } from "@/lib/axios";
import useAuthStore from "@/store/useAuthStore";
import useChatStore from "@/store/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const { checkIsAdmin } = useAuthStore();
  const { initializeSocket, disconnectSocket } = useChatStore();
  useEffect(() => {
    const initalizeAuth = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        if (token) {
          updateApiToken(token);
          await checkIsAdmin();
          // Init the socket connection

          if (userId) {
            initializeSocket(userId);
          }
        }
      } catch (error: any) {
        console.log("Error in initalizeAuth", error);
      } finally {
        setLoading(false);
      }
    };

    initalizeAuth();

    // Clean up the socket connection on unmount
    return () => disconnectSocket();
  }, [getToken, checkIsAdmin, initializeSocket, userId, disconnectSocket]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin size-8 text-emerald-500" />
      </div>
    );
  return <>{children}</>;
};

export default AuthProvider;
