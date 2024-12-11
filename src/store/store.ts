import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

//editor 타입 & 상태관리 총 정리
interface EditorState {
  isOpen: boolean;
  content: string;
  title: string;
  isDialogOpen: boolean;
  toggleEditor: () => void;
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  toggleDialog: (open: boolean) => void;
  resetEditor: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  isOpen: false,
  content: "",
  title: "",
  isDialogOpen: false,
  toggleEditor: () =>
    set((state: EditorState) => ({
      isOpen: !state.isOpen, // `state`의 타입이 EditorState임을 명시
    })),
  setContent: (content) => set({ content }),
  setTitle: (title) => set({ title }),
  toggleDialog: (open) => set({ isDialogOpen: open }),
  resetEditor: () => set({ content: "", title: "" }),
}));

// 메인페이지 몇 시간? 클릭시 상호작용 기능
interface HowTimeState {
  isHowTimeOpen: boolean;
  changingHours: string;
  setChangingHours: (random: string) => void;
  toggleHowTime: () => void;
}
export const useHowTimeStore = create<HowTimeState>((set) => ({
  isHowTimeOpen: false,
  changingHours: "0",
  setChangingHours: (random) => set(() => ({ changingHours: random })),
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

// 메인페이지 Todo 리스트 저장소
interface ToDoType {
  ToDoList: { text: string; id: string }[];
  isShowEditor: boolean;
  EditorText: string;
  Checked: boolean;
  clickedIndex: number;
  toggleShowEditor: () => void;
  updateEditorText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateToDoList: () => void;
  deleteToDoList: (index: number) => void;
  setClickedIndex: (index: number) => void;
}
export const useToDoStore = create<ToDoType>((set) => ({
  ToDoList: JSON.parse(localStorage.getItem("ToDoList")!) || [],
  isShowEditor: false,
  EditorText: "",
  Checked: false,
  clickedIndex: -1,
  toggleShowEditor: () =>
    set((state) => ({
      isShowEditor: !state.isShowEditor,
      EditorText: "",
    })),
  updateEditorText: (event) => {
    set(() => ({
      EditorText: event.target.value,
    }));
  },
  updateToDoList: () => {
    set((state) => ({
      ToDoList: [...state.ToDoList, { text: state.EditorText, id: uuidv4() }],
      EditorText: "",
    }));
  },
  deleteToDoList: (index) => {
    set((state) => ({
      ToDoList: state.ToDoList.filter((_, i) => i !== index),
    }));
  },
  setClickedIndex: (index) => {
    set(() => ({
      clickedIndex: index,
    }));
  },
}));

//headerModalStore
type headerModalStore = {
  modal: boolean;
  type: string | null;
  open: (type: string) => void;
  close: () => void;
};
export const useHeaderModalStore = create<headerModalStore>((set) => ({
  modal: false,
  type: null,
  open: (type: string) => set({ modal: true, type }),
  close: () => set(() => ({ modal: false, type: null })),
}));

// 메인페이지 Timer 저장소
interface TimerStorage {
  hours: number;
  minutes: number;
  seconds: number;
  staticHours: string;
  staticMinuites: string;
  staticSeconds: string;
  setStaticHours: (change: string) => void;
  setStaticMinuites: (change: string) => void;
  setStaticSeconds: (change: string) => void;
  isTimerActive: boolean;
  toggleTimer: () => void;
  activeTimer: () => void;
}
export const useTimerStore = create<TimerStorage>((set) => ({
  hours: localStorage.getItem("TimerTime")
    ? JSON.parse(localStorage.getItem("TimerTime")!)[0]
    : 0,
  minutes: localStorage.getItem("TimerTime")
    ? JSON.parse(localStorage.getItem("TimerTime")!)[1]
    : 0,
  seconds: localStorage.getItem("TimerTime")
    ? JSON.parse(localStorage.getItem("TimerTime")!)[2]
    : 0,
  staticHours: localStorage.getItem("StaticTimerTime")
    ? JSON.parse(localStorage.getItem("StaticTimerTime")!)[0]
    : "00",
  staticMinuites: localStorage.getItem("StaticTimerTime")
    ? JSON.parse(localStorage.getItem("StaticTimerTime")!)[1]
    : "00",
  staticSeconds: localStorage.getItem("StaticTimerTime")
    ? JSON.parse(localStorage.getItem("StaticTimerTime")!)[2]
    : "00",
  setStaticHours: (change) => set(() => ({ staticHours: change })),
  setStaticMinuites: (change) => set(() => ({ staticMinuites: change })),
  setStaticSeconds: (change) => set(() => ({ staticSeconds: change })),
  isTimerActive: false,
  toggleTimer: () => set((state) => ({ isTimerActive: !state.isTimerActive })),
  activeTimer: () => {
    set((state) => {
      const { seconds, minutes, hours } = state;
      const newSeconds = seconds + 1;
      const newMinutes = minutes + Math.floor(newSeconds / 60);
      const newHours = hours + Math.floor(newMinutes / 60);

      return {
        seconds: newSeconds % 60,
        minutes: newMinutes % 60,
        hours: newHours,
      };
    });
  },
}));
