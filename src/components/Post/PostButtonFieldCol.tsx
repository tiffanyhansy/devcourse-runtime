import { Stack } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import VerticalAlignTopRoundedIcon from "@mui/icons-material/VerticalAlignTopRounded";
import { useState } from "react";
import PostButton from "./PostButton";

type Props = {
  onToTop: () => void;
  onComment: () => void;
};

export default function PostButtonFieldCol({ onToTop, onComment }: Props) {
  const [isLikeButtonClicked, setIsLikeButtonClicked] = useState(false);

  const handleClickLikeButton = () => {
    setIsLikeButtonClicked(!isLikeButtonClicked);
  };

  return (
    <Stack
      gap={2}
      className="w-[72px] items-center h-[220px] justify-center rounded-full drop-shadow-lg"
      style={{
        position: "fixed",
        right: "30px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {/* 좋아요 버튼 */}
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

      {/* 댓글 버튼 */}
      <PostButton
        icon={
          <MessageOutlinedIcon
            sx={{ fontSize: "28px" }}
            className="hover:text-[#7eacb5]"
          />
        }
        onClick={onComment}
      />

      {/* 맨 위로 버튼 */}
      <PostButton
        icon={
          <VerticalAlignTopRoundedIcon
            sx={{ fontSize: "28px" }}
            className="hover:text-[#888]"
          />
        }
        onClick={onToTop}
      />
    </Stack>
  );
}
