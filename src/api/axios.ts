import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = // 여기에 토큰값 담은 store 변수를 가져와야함
//   if(token){
//     config.headers["Authorization"] = `Barear ${token}`
//   }
//   return config
// })
