import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import { styled } from "@mui/material";

export default function FloatingActionButtons() {
  return (
    <Box
      sx={{
        "& > :not(style)": {
          color: "#F0F5F8",
        },
        "& .MuiFab-root": {
          // Fab 버튼에 대한 추가 스타일
        },
      }}
    >
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
}
