import { Stack } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import VerticalAlignTopRoundedIcon from "@mui/icons-material/VerticalAlignTopRounded";
import PostButton from "../Post/PostButton";
import { useCommentStore } from "../../store/comment";

type Props = {
  onToTop: () => void;
  onComment: () => void;
  postId: string; // 좋아요를 처리할 게시물 ID
  currentUserId: string | null;
};

export default function ControlBtn({
  onToTop,
  onComment,
  postId,
  currentUserId,
}: Props) {
  const { toggleLike, posts } = useCommentStore();
  const likedPost = posts.find((post) => post._id === postId);

  const handleClickLikeButton = async (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 방지

    if (!currentUserId) {
      console.error("사용자의 ID 찾을 수 없음");
      return;
    }

    if (likedPost) {
      try {
        console.log(
          `좋아요 ${
            likedPost.isLiked ? "취소" : "추가"
          } 요청 시작: postId=${postId}`
        );
        await toggleLike(postId, currentUserId);
        console.log(
          `좋아요 ${
            likedPost.isLiked ? "취소" : "추가"
          } 요청 성공: postId=${postId}`
        );
      } catch (error) {
        console.error("좋아요 처리 실패:", error);
      }
    } else {
      console.error("게시물을 찾을 수 없습니다.");
    }
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
          likedPost?.isLiked ? (
            <FavoriteRoundedIcon
              sx={{
                fontSize: "28px",
                color: "#C96868", // 좋아요 상태에서 색상 유지
                "&:hover": {
                  color: "#C96868", // hover 상태에서도 같은 색상 유지
                },
              }}
            />
          ) : (
            <FavoriteBorderRoundedIcon
              sx={{
                fontSize: "28px",
                "&:hover": {
                  color: "#C96868", // 좋아요 상태가 아닐 때 hover 시 색상 변경
                },
              }}
            />
          )
        }
        onClick={handleClickLikeButton}
        disabled={false}
      />

      {/* 댓글 버튼 */}
      <PostButton
        icon={
          <MessageOutlinedIcon
            sx={{ fontSize: "28px" }}
            className="hover:text-[#7eacb5]"
          />
        }
        onClick={(event) => {
          event.stopPropagation();
          onComment();
        }}
      />

      {/* 맨 위로 버튼 */}
      <PostButton
        icon={
          <VerticalAlignTopRoundedIcon
            sx={{ fontSize: "28px" }}
            className="hover:text-[#888]"
          />
        }
        onClick={(event) => {
          event.stopPropagation();
          onToTop();
        }}
      />
    </Stack>
  );
}
