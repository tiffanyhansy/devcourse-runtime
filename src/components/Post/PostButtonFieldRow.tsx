import { Stack } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import VerticalAlignTopRoundedIcon from "@mui/icons-material/VerticalAlignTopRounded";
import { useState } from "react";
import PostButton from "./PostButton";

export default function PostButtonFieldRow() {
  const [isLikeButtonClicked, setIsLikeButtonClicked] = useState(false);
  const handleClickLikeButton = () => {
    setIsLikeButtonClicked(!isLikeButtonClicked);
  };

  const handleClickCommentButton = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    console.log("comment button clicked");
  };

  const handleToTopButton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Stack
        direction={"row"}
        gap={2}
        className="w-[220px] items-center h-[72px] justify-center rounded-full drop-shadow-lg"
        style={{
          position: "fixed",
          right: "15%",
          top: "8%",
        }}
      >
        <PostButton
          icon={
            isLikeButtonClicked ? (
              <FavoriteRoundedIcon
                sx={{
                  fontSize: "28px",
                  color: "#C96868",
                }}
              />
            ) : (
              <FavoriteBorderRoundedIcon
                sx={{
                  fontSize: "28px",
                  "&:hover": {
                    color: "#C96868",
                  },
                }}
              />
            )
          }
          onClick={handleClickLikeButton}
        />

        <PostButton
          icon={
            <MessageOutlinedIcon
              sx={{ fontSize: "28px" }}
              className="hover:text-[#7eacb5]"
            />
          }
          onClick={handleClickCommentButton}
        />

        <PostButton
          icon={
            <VerticalAlignTopRoundedIcon
              sx={{ fontSize: "28px" }}
              className="hover:text-[#888]"
            />
          }
          onClick={handleToTopButton}
        />
      </Stack>
    </>
  );
}
