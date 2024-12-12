import FloatingActionButtons from "../../../../components/Mui/Fab";
import ResetFab from "../../../../components/Mui/ResetFab";
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
            isPlayBtnClicked ? (isAchieve ? "#FADFA1" : "#778899") : ""
          }`,
          color: `${isPlayBtnClicked ? "#ffffff" : ""}`,
        }}
        isFlowTime={true}
        alertSound={true}
      />
      <article className="flex gap-[10px]">
        <FloatingActionButtons />
        <ResetFab />
      </article>
    </>
  );
}
