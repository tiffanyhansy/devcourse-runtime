import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import dayjs, { Dayjs } from "dayjs";

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
  ToDoList: { text: string; id: string; checked: boolean }[];
  isShowEditor: boolean;
  EditorText: string;
  clickedIndex: number;
  toggleShowEditor: () => void;
  updateEditorText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateToDoListCheck: (
    newToDoList: { text: string; id: string; checked: boolean }[]
  ) => void;
  updateToDoList: () => void;
  deleteToDoList: (index: number) => void;
  setClickedIndex: (index: number) => void;
}
export const useToDoStore = create<ToDoType>((set) => ({
  ToDoList: JSON.parse(localStorage.getItem("ToDoList")!) || [],
  isShowEditor: false,
  EditorText: "",
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
  // 체크박스 클릭시 체크상태 업데이트
  updateToDoListCheck: (newToDoList) => {
    console.log(newToDoList);
    set(() => ({
      ToDoList: newToDoList,
    }));
  },
  // todo리스트 최초생성시 Todo리스트 배열에 추가
  updateToDoList: () => {
    set((state) => ({
      ToDoList: [
        ...state.ToDoList,
        { text: state.EditorText, id: uuidv4(), checked: false },
      ],
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

// 헤더 > 프로필 모달
// 메인 > 친구목록 리스트 모달
type profileModalStore = {
  modal: boolean;
  type: string | null;
  open: (type: string) => void;
  close: () => void;
};
export const useprofileModalStore = create<profileModalStore>((set) => ({
  modal: false,
  type: null,
  open: (type: string) => set({ modal: true, type }),
  close: () => set(() => ({ modal: false, type: null })),
}));

// 메인 > 친구관리 모달
type friendModalStore = {
  modal: boolean;
  open: () => void;
  close: () => void;
};
export const useFriendModalStore = create<friendModalStore>((set) => ({
  modal: false,
  open: () => set(() => ({ modal: true })),
  close: () => set(() => ({ modal: false })),
}));

// 메인페이지 Timer 기능 저장소
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
  resetTimer: () => void;
  isResetAlertModalOn: boolean;
  setResetAlertModal: () => void;
  isAchieve: boolean;
  setIsAchieve: () => void;
  trophyModalViewed: boolean;
  setTrophyModalViewed: () => void;
  setTrophyModalNotViewed: () => void;
  alertSoundPlayed: boolean;
  setAlertSoundPlayed: () => void;
  setAlertSoundNotPlayed: () => void;
  isPlayingWhiteNoise: boolean;
  toggleWhiteNoise: () => void;
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
  resetTimer: () => {
    set(() => ({
      hours: 0,
      minutes: 0,
      seconds: 0,
    }));
  },
  isResetAlertModalOn: false,
  setResetAlertModal: () => {
    set((state) => ({ isResetAlertModalOn: !state.isResetAlertModalOn }));
  },
  isAchieve: false,
  setIsAchieve: () => set((state) => ({ isAchieve: !state.isAchieve })),
  // 트로피 모달 전역변수입니당
  trophyModalViewed: false,
  setTrophyModalViewed: () => set(() => ({ trophyModalViewed: true })),
  setTrophyModalNotViewed: () => set(() => ({ trophyModalViewed: false })),
  alertSoundPlayed: false,
  setAlertSoundPlayed: () => set(() => ({ alertSoundPlayed: true })),
  setAlertSoundNotPlayed: () => set(() => ({ alertSoundPlayed: false })),

  //백색소음 재생
  isPlayingWhiteNoise: false,
  toggleWhiteNoise: () =>
    set((state) => ({ isPlayingWhiteNoise: !state.isPlayingWhiteNoise })),
}));

// 메인페이지 TimeSetter 저장소(static 시간 관리)
interface TimeSetterStorage {
  isTimeSetterOpen: boolean;
  setIsTimeSetterOpen: () => void;
  selectDate: Dayjs | null;
  selectHours: string;
  selectMinuites: string;
  selectSeconds: string;
  DateSet: (day: dayjs.Dayjs | null, date: Date | null) => void; // Mui timePicker 결과값은 Dayjs라는 MUI에서 만든 커스텀 타입을 가지고 있음
}
export const useTimeSetterStore = create<TimeSetterStorage>((set) => ({
  isTimeSetterOpen: false,
  setIsTimeSetterOpen: () =>
    set((state) => ({
      isTimeSetterOpen: !state.isTimeSetterOpen,
    })),
  selectDate: null, // TimePicker로 가져온 모든 데이터가 담김, Date 객체만 담기는게 아님{$s, $d 등등...}
  selectHours: "",
  selectMinuites: "",
  selectSeconds: "",
  DateSet: (day, date) =>
    set(() => ({
      selectDate: day,
      selectHours:
        date?.getHours()! >= 10
          ? `${date?.getHours()}`
          : `0${date?.getHours()}`,
      selectMinuites:
        date?.getMinutes()! >= 10
          ? `${date?.getMinutes()}`
          : `0${date?.getMinutes()}`,
      selectSeconds:
        date?.getSeconds()! >= 10
          ? `${date?.getSeconds()}`
          : `0${date?.getSeconds()}`,
    })),
}));

// 메인페이지 하트 이스터에그 저장소
interface useEasterEgg {
  hearts:
    | {
        id: number;
        style: React.CSSProperties;
      }[]
    | [];
  handleNameClick: () => void;
}
interface Heart {
  id: number;
  style: React.CSSProperties;
}

export const useEasterEgg = create<useEasterEgg>((set) => ({
  hearts: [],
  handleNameClick: () => {
    const newHeart: Heart = {
      id: Date.now(),
      style: {
        position: "absolute",
        left: `${Math.random() * 100}%`, // 랜덤한 위치
        top: `${Math.random() * 90}%`, // 100%일 경우 화면이 밀리게 됨
        fontSize: "30px",
        color: "red",
        animation: "float 2s ease-in-out", // 애니메이션 적용
        zIndex: 50,
      },
    };
    set((state) => ({ hearts: [...state.hearts, newHeart] }));

    setTimeout(() => {
      set((state) => ({
        hearts: state.hearts.filter((heart) => heart.id !== newHeart.id),
      }));
    }, 2000); // 하트가 2초 후에 사라짐
  },
}));

//마이페이지 저장소
interface ProfileState {
  clickedField: Set<number>;
  isEditable: boolean;
  profilePic: string;
  tempProfilePic: string;
  fullName: string;
  username: string;
  website: string;
  tempClickedField: Set<number>;

  setClickedField: (fields: Set<number>) => void;
  setIsEditable: (editable: boolean) => void;
  setProfilePic: (pic: string) => void;
  setTempProfilePic: (pic: string) => void;
  setFullName: (fullName: string) => void;
  setUsername: (username: string) => void;
  setWebsite: (website: string) => void;
  setTempClickedField: (fields: Set<number>) => void;
}

const initialProfilePic = "/src/asset/default_profile.png";

export const useProfileStore = create<ProfileState>((set, get) => ({
  clickedField: new Set(),
  isEditable: false,
  profilePic: initialProfilePic,
  tempProfilePic: initialProfilePic,
  fullName: "",
  username: "",
  website: "",
  tempClickedField: new Set(),

  setClickedField: (fields) => set({ clickedField: fields }),
  setIsEditable: (editable) => set({ isEditable: editable }),
  setProfilePic: (pic) => set({ profilePic: pic }),
  setTempProfilePic: (pic) => set({ tempProfilePic: pic }),
  setFullName: (fullName) => {
    set({ fullName });
    const { username } = get();
    //username이 미정이면 fullName 할당
    if (!username.trim()) {
      set({ username: fullName });
    }
  },
  setUsername: (username) => set({ username }),
  setWebsite: (website) => set({ website }),
  setTempClickedField: (fields) => set({ tempClickedField: fields }),
}));
