import { create } from "zustand";
import { useLoginStore } from "../store/API";
import { v4 as uuidv4 } from "uuid";
import dayjs, { Dayjs } from "dayjs";

//editor 타입 & 상태관리 총 정리
interface EditorState {
  isOpen: boolean;
  content: string;
  title: string;
  isAlertOpen: boolean;
  isDialogOpen: boolean;
  isShake: boolean;
  isChannelDialogOpen: boolean;
  errorMessage: string;

  handleCancel: (setImage: (file: File | null) => void) => void;
  confirmClose: (setImage: (file: File | null) => void) => void;
  cancelClose: () => void;

  closeLoginDialog: () => void;
  setShake: (value: boolean) => void;
  setErrorMessage: (message: string) => void;
  resetShakeAndError: () => void;

  toggleEditor: () => void;
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  toggleDialog: (open: boolean) => void;
  resetEditor: () => void;

  openChannelDialog: () => void;
  closeChannelDialog: () => void;
  toggleChannelDialog: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  isOpen: false,
  isAlertOpen: false,
  content: "",
  title: "",
  isDialogOpen: false,
  isShake: false,
  errorMessage: "",
  isChannelDialogOpen: false,

  setShake: (value: boolean) => set({ isShake: value }),
  setErrorMessage: (message: string) => set({ errorMessage: message }),
  resetShakeAndError: () =>
    set({
      isShake: false,
      errorMessage: "",
    }),

  //로그인 검증여부 추가
  toggleEditor: () => {
    const token = useLoginStore.getState().token; // 로그인 상태의 토큰 확인
    if (!token) {
      set({ isAlertOpen: true }); // 로그인 안내 메시지
      return;
    }
    set((state: EditorState) => ({
      isOpen: !state.isOpen,
    }));
  },

  closeLoginDialog: () => set({ isAlertOpen: false }),
  setContent: (content) => set({ content }),
  setTitle: (title) => set({ title }),

  toggleDialog: (open) => set({ isDialogOpen: open }),
  resetEditor: () => set({ content: "", title: "" }),

  // handleCancel 함수 - setImage를 매개변수로 받아 사용
  handleCancel: (setImage) => {
    const { content, title, toggleDialog, resetEditor, toggleEditor } = get();

    if ((content.trim() && content.trim() !== "<p><br></p>") || title.trim()) {
      toggleDialog(true);
    } else {
      resetEditor();
      setImage(null);
      toggleEditor();
    }
  },
  //Dialog 상태 통합
  confirmClose: (setImage) => {
    const { resetEditor, toggleEditor, toggleDialog } = get();
    resetEditor();
    setImage(null);
    toggleDialog(false);
    toggleEditor();
  },
  // 다이얼로그 취소
  cancelClose: () => {
    const { toggleDialog } = get();
    toggleDialog(false);
  },

  openChannelDialog: () => set({ isChannelDialogOpen: true }),
  closeChannelDialog: () => set({ isChannelDialogOpen: false }),
  toggleChannelDialog: () => {
    set((state: EditorState) => ({
      isChannelDialogOpen: !state.isChannelDialogOpen,
    }));
  },
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
interface Username {
  username: string;
  website: string;
  field: string[];
}

interface ProfileState {
  clickedField: string[];
  isEditable: boolean;
  image: string;
  tempProfilePic: string | File;
  fullName: string;
  username: Username;
  tempClickedField: string[];
  parsedField: string[];
  isLoading: boolean;

  setClickedField: (fields: string[]) => void;
  setIsEditable: (editable: boolean) => void;
  setProfilePic: (profilePic: string) => void;
  setTempProfilePic: (profilePic: string | File) => void;
  setFullName: (fullName: string) => void;
  setUsername: (username: Username) => void;
  setTempClickedField: (fields: string[]) => void;
  setParsedField: (fields: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const initialProfilePic = "/src/asset/default_profile.png";
export const useProfileStore = create<ProfileState>((set) => ({
  clickedField: [],
  isEditable: false,
  image: initialProfilePic,
  tempProfilePic: initialProfilePic,
  fullName: "",
  username: {
    username: "",
    website: "",
    field: [],
  },
  tempClickedField: [],
  parsedField: [],
  isLoading: true,

  setClickedField: (fields) => set({ clickedField: fields }),
  setIsEditable: (editable) => set({ isEditable: editable }),
  setProfilePic: (image) => set({ image: image }),
  setTempProfilePic: (profilePic) => set({ tempProfilePic: profilePic }),
  setFullName: (fullName) => set({ fullName }),
  setUsername: (username) => set({ username }),
  setTempClickedField: (fields) => set({ tempClickedField: fields }),
  setParsedField: (fields) => set({ parsedField: fields }),
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
}));
