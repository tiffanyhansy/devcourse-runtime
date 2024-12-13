import { create } from "zustand";

// 로그인시 가져오는 유저정보
interface LoginType {
  user: userType | {};
  token: string | "";
  setUser: (axiosData: userType | {}) => void;
  setToken: (axiosToken: string | "") => void;
}
export const useLoginStore = create<LoginType>((set) => ({
  user: JSON.parse(localStorage.getItem("LoginUserInfo")!) || {},
  token: JSON.parse(localStorage.getItem("LoginUserToken")!) || "",
  setUser: (axiosData) => set(() => ({ user: axiosData })),
  setToken: (axiosToken) => set(() => ({ token: axiosToken })),
}));
