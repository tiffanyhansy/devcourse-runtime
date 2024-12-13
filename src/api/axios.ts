import axios from "axios";
import { useLoginStore } from "../store/API";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// axiosInstance에 Authorization 미리 설정하기(토큰값 집어넣기)
axiosInstance.interceptors.request.use((config) => {
  const token = useLoginStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Barear ${token}`;
  }
  return config;
});
