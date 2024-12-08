import { create } from "zustand";

//에디터 모달창
interface EditorState {
  isEditorOpen: boolean;
  toggleEditor: () => void;
  saveContent: () => void;
}

const useEditorStore = create<EditorState>((set) => ({
  isEditorOpen: false,
  toggleEditor: () =>
    set((state) => ({
      isEditorOpen: !state.isEditorOpen,
    })),
  saveContent: () => {
    alert("테스트용 // 출간 완료!");
    set({ isEditorOpen: false });
  },
}));

export default useEditorStore;

// 메인페이지 몇 시간? 클릭시 상호작용 기능
interface HowTimeState {
  isHowTimeOpen: boolean;
  toggleHowTime: () => void;
}
export const useHowTimeStore = create<HowTimeState>((set) => ({
  isHowTimeOpen: false,
  toggleHowTime: () =>
    set((state) => ({
      isHowTimeOpen: !state.isHowTimeOpen,
    })),
}));

// 메인 페이지 타이머재생 버튼 클릭시 상호작용 기능
interface TimerPlayStoreState {
  isPlayBtnClicked: boolean;
  togglePlayBtn: () => void;
}
export const useTimerPlayStore = create<TimerPlayStoreState>((set) => ({
  isPlayBtnClicked: false,
  togglePlayBtn: () =>
    set((state) => ({
      isPlayBtnClicked: !state.isPlayBtnClicked,
    })),
}));

//headerModalStore

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
