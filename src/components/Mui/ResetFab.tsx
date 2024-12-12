import { Box, Fab } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTimerPlayStore, useTimerStore } from "../../store/store";

export default function ResetFab() {
  const isPlayBtnClicked = useTimerPlayStore((state) => state.isPlayBtnClicked);
  const resetTimer = useTimerStore((state) => state.resetTimer);
  const isResetAlertModalOn = useTimerStore(
    (state) => state.isResetAlertModalOn
  );
  const setResetAlertModal = useTimerStore((state) => state.setResetAlertModal);

  return (
    <>
      <Box
        sx={{
          "& > :not(style)": {
            backgroundColor: "#F0F5F8",
            zIndex: 0,
          },
        }}
      >
        <Fab
          aria-label="play"
          onClick={setResetAlertModal}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            backgroundColor: isPlayBtnClicked ? "#778899" : "",
            color: isPlayBtnClicked ? "#ffffff" : "",
          }}
        >
          <ReplayIcon style={{ width: "2em", height: "2rem" }} />
        </Fab>
      </Box>
      {isResetAlertModalOn ? (
        <>
          <article className="w-full h-full absolute top-0 left-0 z-50">
            <article className="w-[400px] h-[200px] bg-white border rounded-[10px] flex flex-col gap-[20px] items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
              <span className="text-[30px] font-bold">
                정말 초기화 하시나요?
              </span>
              <button
                onClick={() => {
                  resetTimer();
                  setResetAlertModal();
                  localStorage.setItem("TimerTime", JSON.stringify([0, 0, 0]));
                }}
              >
                네
              </button>
              <button onClick={setResetAlertModal}>아니요</button>
            </article>
            <article
              className="w-full h-full bg-black bg-opacity-70 z-40"
              onClick={setResetAlertModal}
            ></article>
          </article>
        </>
      ) : null}
    </>
  );
}
