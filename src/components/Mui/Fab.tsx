import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { useTimerPlayStore, useTimerStore } from "../../store/store";

// active에 값이 있으면 실행을 정지
let Active: number = 0;

export default function FloatingActionButtons() {
  const isPlayBtnClicked = useTimerPlayStore((state) => state.isPlayBtnClicked);
  const togglePlayBtn = useTimerPlayStore((state) => state.togglePlayBtn);
  const activeTimer = useTimerStore((state) => state.activeTimer);
  const toggleTimer = useTimerStore((state) => state.toggleTimer);
  const isTimerActive = useTimerStore((state) => state.isTimerActive);
  const hours = useTimerStore((state) => state.hours);
  const minutes = useTimerStore((state) => state.minutes);
  const seconds = useTimerStore((state) => state.seconds);

  React.useEffect(() => {
    // 시계 동작
    if (isTimerActive) {
      if (Active === 0) {
        Active = setInterval(() => {
          activeTimer();
        }, 1000);
      }
      localStorage.setItem(
        "TimerTime",
        JSON.stringify([hours, minutes, seconds])
      );
    }
    localStorage.setItem(
      "TimerTime",
      JSON.stringify([hours, minutes, seconds])
    );
    if (!isTimerActive) {
      clearTimeout(Active);
      Active = 0;
    }
    return () => {
      localStorage.setItem(
        "TimerTime",
        JSON.stringify([hours, minutes, seconds])
      );
    };
  }, [isTimerActive, activeTimer]);

  return (
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
        onClick={() => {
          togglePlayBtn();
          toggleTimer();
        }}
        style={{
          width: "5rem",
          height: "5rem",
          boxShadow: "none",
        }}
      >
        {isPlayBtnClicked ? (
          <PauseRoundedIcon
            style={{ width: "3rem", height: "3rem", opacity: 0.7 }}
          />
        ) : (
          <PlayArrowRoundedIcon
            style={{ width: "3rem", height: "3rem", opacity: 0.7 }}
          />
        )}
      </Fab>
    </Box>
  );
}
