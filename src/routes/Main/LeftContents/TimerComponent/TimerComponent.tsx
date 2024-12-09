import FloatingActionButtons from "../../../../components/Mui/Fab";
import { useTimerPlayStore } from "../../../../store/store";
import Timer from "./Timer";

export default function TimerComponent() {
  const { isPlayBtnClicked } = useTimerPlayStore();
  return (
    <>
      <Timer
        style={{
          backgroundColor: `${isPlayBtnClicked ? "#778899" : ""}`,
          color: `${isPlayBtnClicked ? "#ffffff" : ""}`,
        }}
      />
      <FloatingActionButtons />
    </>
  );
}
