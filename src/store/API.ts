import { create } from "zustand";

// 로그인시 가져오는 유저정보
interface LoginType {
  user: userType | {};
  setUser: (axiosData: userType) => void;
}
export const useLoginStore = create<LoginType>((set) => ({
  user: {},
  setUser: (axiosData) => set(() => ({ user: axiosData })),
}));
