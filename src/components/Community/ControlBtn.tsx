import { useEffect } from "react";
import { Stack } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import VerticalAlignTopRoundedIcon from "@mui/icons-material/VerticalAlignTopRounded";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PostButton from "../Post/PostButton";
import { useCommentStore } from "../../store/comment";
import { useNotificationsStore } from "../../store/notificationsStore";
import { useLoginStore } from "../../store/API";
import { axiosInstance } from "../../api/axios";
import { Author_T } from "../../api/api";

type Props = {
  onToTop: () => void;
  onComment: () => void;
  postId: string; // 좋아요를 처리할 게시물 ID
  currentUserId: string | null;
  author: Author_T;
  closeModal: () => void;
};

export default function ControlBtn({
  onToTop,
  onComment,
  postId,
  currentUserId,
  author,
  closeModal,
}: Props) {
  const { toggleLike, posts } = useCommentStore();
  const likedPost = posts.find((post) => post._id === postId);
  const { createNotifications, updateLikeState } = useNotificationsStore();
  const { likeStates } = useNotificationsStore();
  const user = useLoginStore((state) => state.user);

  // 좋아요 유지 로직
  const likedItems = Object.entries(likeStates!)
    .filter(([_, value]) => value.isLiked === false && value.myId === user?._id)
    .map(([key, value]) => ({ key, ...value }));

  let filteredData = likedPost?.likes.filter((item: { post: string }) => {
    return likedItems.some((likedItem) => likedItem.key === item.post);
  });

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
        const like1 = (
          await axiosInstance.post(`likes/create`, {
            postId: postId,
          })
        ).data;
        if (!likedPost.isLiked) {
          updateLikeState!(author._id, postId, likedPost.isLiked, user?._id);
          createNotifications!({
            notiType: "LIKE",
            notiTypeId: like1._id + "",
            userId: author._id + "",
            postId: postId + "",
          });
        } else {
          updateLikeState!(author._id, postId, likedPost.isLiked);
        }
      } catch (error) {
        console.error("좋아요 처리 실패:", error);
      }
    } else {
      console.error("게시물을 찾을 수 없습니다.");
    }
  };

  useEffect(() => {
    filteredData = likedPost?.likes.filter((item: any) => {
      return likedItems.some(
        (likedItem) =>
          likedItem.userId === item.user && likedItem.key === item.post
      );
    });
  }, [filteredData]);

  return (
    <Stack
      gap={2}
      className="w-[72px] items-center h-[280px] justify-center rounded-full drop-shadow-lg"
      style={{
        position: "fixed",
        right: "40px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {/* 좋아요 버튼 */}
      <PostButton
        icon={
          filteredData && filteredData.length > 0 ? (
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
            className="hover:text-[#7eacb5]"
          />
        }
        onClick={(event) => {
          event.stopPropagation();
          onToTop();
        }}
      />
      <IconButton
        onClick={closeModal}
        sx={{
          width: "52px", // 너비
          height: "52px", // 높이
          backgroundColor: "white", // 배경색
          borderRadius: "50%", // 둥근 모서리
          "&:hover": {
            backgroundColor: "#f0f0f0", // 호버 시 밝은 배경색
            "& svg": {
              color: "#7eacb5", // 아이콘 색상 변경
            },
          },
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // 약간의 그림자 효과
        }}
      >
        <CloseIcon sx={{ color: "black" }} />
      </IconButton>
    </Stack>
  );
}
