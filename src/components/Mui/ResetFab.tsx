import { Box, Fab, Stack } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTimerPlayStore, useTimerStore } from "../../store/store";
import Button from "../common/SquareButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
            backgroundColor: "#D5E6E9",
            zIndex: 0,
          },
        }}
      >
        <Fab
          aria-label="play"
          onClick={setResetAlertModal}
          style={{
            width: "5rem",
            height: "5rem",
            backgroundColor: isPlayBtnClicked ? "#98acc1" : "",
            color: isPlayBtnClicked ? "#ffffff" : "",
            boxShadow: "none",
          }}
        >
          <ReplayIcon style={{ width: "3em", height: "3rem", opacity: 0.7 }} />
        </Fab>
      </Box>
      {isResetAlertModalOn ? (
        <>
          <article className="absolute top-0 left-0 z-50 w-full h-full">
            <article className="w-[400px] h-[200px] bg-white border rounded-[10px] flex flex-col gap-[20px] items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
              <Stack
                width="340px"
                direction="row"
                gap={2}
                alignItems="center"
                className=" justify-stretch"
              >
                <div className="flex items-center justify-center p-2 bg-[#FEF3F2] rounded-full">
                  <div className="flex items-center justify-center py-2 bg-[#FEE4E2] rounded-full">
                    <DeleteForeverIcon
                      style={{ width: "2em", height: "2rem", color: "#E14444" }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-extrabold">
                    정말 초기화 하시나요?
                  </span>

                  <span className="block text-sm text-gray-700">
                    이 작업은 되돌릴 수 없습니다.{" "}
                  </span>
                </div>
              </Stack>

              <Stack direction="row" gap={2} alignItems="center">
                <Button
                  size="md"
                  textSize="sm"
                  variant="todo"
                  className="border-2 border-[#D6D6D6] border-solid text-gray-700 hover:bg-gray-100"
                  onClick={setResetAlertModal}
                >
                  취소
                </Button>

                <Button
                  size="md"
                  textSize="sm"
                  variant="custom"
                  className="bg-[#E14444] hover:bg-[#e14444c0]"
                  onClick={() => {
                    resetTimer();
                    setResetAlertModal();
                    localStorage.setItem(
                      "TimerTime",
                      JSON.stringify([0, 0, 0])
                    );
                  }}
                >
                  초기화
                </Button>
              </Stack>
            </article>
            <article
              className="z-40 w-full h-full bg-black bg-opacity-70"
              onClick={setResetAlertModal}
            ></article>
          </article>
        </>
      ) : null}
    </>
  );
}
