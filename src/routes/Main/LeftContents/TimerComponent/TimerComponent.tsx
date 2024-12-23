import FloatingActionButtons from "../../../../components/Mui/Fab";
import ResetFab from "../../../../components/Mui/ResetFab";
import WhiteNoise from "../../../../components/Mui/WhiteNoise";
import { useTimerPlayStore, useTimerStore } from "../../../../store/store";
import Timer from "./Timer";

export default function TimerComponent() {
  const isPlayBtnClicked = useTimerPlayStore((state) => state.isPlayBtnClicked);
  const isAchieve = useTimerStore((state) => state.isAchieve);
  return (
    <>
      <Timer
        style={{
          backgroundColor: `${
            isPlayBtnClicked ? (isAchieve ? "#FADFA1" : "#778899") : "#F0F5F8"
          }`,
          color: `${isPlayBtnClicked ? "#ffffff" : ""}`,
        }}
        isFlowTime={true}
        alertSound={true}
      />
      <article
        className={`flex items-center justify-between px-12 w-[25rem] h-[5rem] -mt-36 border-t border-gray-200 pt-14`}
      >
        <WhiteNoise />
        <FloatingActionButtons />
        <ResetFab />
      </article>
    </>
  );
}
