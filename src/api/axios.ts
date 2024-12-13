import axios from "axios";
import { useLoginStore } from "../store/API";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// axiosInstance에 Authorization 미리 설정하기(토큰값 집어넣기)
axiosInstance.interceptors.request.use((config) => {
  const token = useLoginStore((state) => state.token); // 여기에 토큰값 담은 store 변수를 가져와야함
  if (token !== "") {
    config.headers["Authorization"] = `Barear ${token}`;
  }
  return config;
});
