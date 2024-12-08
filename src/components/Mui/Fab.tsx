import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import { createTheme, styled } from "@mui/material";
import { useTimerPlayStore } from "../../store/store";

export default function FloatingActionButtons() {
  const { isPlayBtnClicked, togglePlayBtn } = useTimerPlayStore();
  return (
    <Box
      sx={{
        "& > :not(style)": {
          backgroundColor: "#F0F5F8",
          zIndex: 0,
        },
      }}
    >
      <Fab aria-label="play" onClick={togglePlayBtn}>
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
