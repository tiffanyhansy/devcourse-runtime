import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import { createTheme, styled } from "@mui/material";
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
      console.log(Active);
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
          backgroundColor: "#F0F5F8",
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
      >
        <img
          src={
            isPlayBtnClicked
              ? "/public/pause_icon.svg"
              : "/public/play_icon.svg"
          }
          alt={isPlayBtnClicked ? "재생하기 버튼" : "일시정지 버튼"}
        />
      </Fab>
    </Box>
  );
}
