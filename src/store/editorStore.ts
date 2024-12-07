import { create } from "zustand";

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
