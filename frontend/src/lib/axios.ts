import axios from "axios";
import { Clerk } from "@clerk/clerk-js";

const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
let isLoaded = false;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5005/api",
});

axiosInstance.interceptors.request.use(async (config) => {
  if (!isLoaded) {
    await clerk.load();
    isLoaded = true;
  }

  const token = await clerk.session?.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
