import { create } from "zustand";

type headerModalStore = {
  modal: boolean;
  open: () => void;
  close: () => void;
};
export const useHeaderModalStore = create<headerModalStore>((set) => ({
  modal: false,
  open: () => set((state) => ({ modal: !state.modal })),
  close: () => set(() => ({ modal: false })),
}));
