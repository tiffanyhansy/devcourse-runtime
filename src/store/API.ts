import { create } from "zustand";
import { userType } from "../api/api";

// 로그인시 가져오는 유저정보
interface LoginType {
  user: userType | null;
  token: string | null;
  setUser: (axiosData: userType | null) => void;
  setToken: (axiosToken: string | null) => void;
}
export const useLoginStore = create<LoginType>((set) => ({
  user: JSON.parse(localStorage.getItem("LoginUserInfo")!) || null,
  token: JSON.parse(localStorage.getItem("LoginUserToken")!) || null,
  setUser: (axiosData) => set(() => ({ user: axiosData })),
  setToken: (axiosToken) => set(() => ({ token: axiosToken })),
}));
