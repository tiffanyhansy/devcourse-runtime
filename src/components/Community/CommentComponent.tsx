import React, { useState, useEffect } from "react";
import { useCommentStore } from "../../store/comment";
import { Author_T, Post_T, PostComment } from "../../api/api";
import { useLoginStore } from "../../store/API";
import { Link } from "react-router";
import default_profile from "../../asset/default_profile.png";
import comment from "../../asset/images/comment.svg";
import { useNotificationsStore } from "../../store/notificationsStore";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  Box,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { axiosInstance } from "../../api/axios";
import { t } from "i18next";

type CommentComponentProps = {
  postId: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  post?: Post_T;
  author: Author_T;
  comments: PostComment[]; // 댓글 객체 배열
};

const CommentComponent: React.FC<CommentComponentProps> = ({
  postId,
  inputRef,
  comments,
  author,
}) => {
  //로그인 유저 정보 가져오기
  const { posts, addCommentToPost, deleteComment } = useCommentStore();
  const user = useLoginStore((state) => state.user);
  const { createNotifications } = useNotificationsStore();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); // Snackbar 열림 상태
  const [snackbarMessage, setSnackbarMessage] = useState<string>(""); // Snackbar 메시지
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

  const [newComment, setNewComment] = useState<string>("");

  // 현재 게시물 가져오기
  const currentPost = posts.find((post) => post._id === postId);

  useEffect(() => {
    if (!currentPost && posts.length > 0) {
      console.error("해당 postId에 해당하는 게시물이 없습니다.");
    }
  }, [currentPost, posts]);

  //로딩시 (모달은 거의 없음)
  if (!posts.length) {
    return <Typography>{t("로딩중...")}</Typography>;
  }

  //오류 체크
  if (!currentPost) {
    return <Typography>{t("해당 게시물을 찾을 수 없습니다.")}</Typography>;
  }

  const handleSnackbarClose = (
    // event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickAway") return; // 클릭 이외의 이벤트 무시
    setSnackbarOpen(false);
  };

  const handleAddComment = async () => {
    if (!user) {
      setSnackbarMessage(t("로그인을 해주세요"));
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    try {
      await addCommentToPost(postId, newComment);

      const comment = (
        await axiosInstance.post(`comments/create`, {
          comment: newComment,
          postId: postId,
        })
      ).data;

      setNewComment(""); // 입력 필드 초기화
      createNotifications!({
        notiType: "COMMENT",
        notiTypeId: comment._id + "",
        userId: author._id + "",
        postId: postId + "",
      });
      setSnackbarMessage(t("댓글이 성공적으로 작성되었습니다."));
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(t("댓글 작성에 실패했습니다."));
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setSnackbarMessage(t("댓글이 성공적으로 삭제되었습니다."));
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(t("댓글 삭제에 실패했습니다."));
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  //날짜 포멧
  const formatDateToKorean = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const formattedHours = isPM ? hours - 12 || 12 : hours; // 12시간제 표현
    const period = isPM ? t("오후") : t("오전");

    return t(
      "{{year}}년 {{month}}월 {{day}}일 {{period}} {{hours}}:{{minutes}}",
      {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        period,
        hours: formattedHours,
        minutes: minutes.toString().padStart(2, "0"),
      }
    );
  };

  return (
    <Box className="m-auto relative w-[90%] md:w-[70%] mt-12">
      {/* 댓글 입력 */}
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          border: "none",
          boxShadow: "none",
          backgroundColor: "#f9fafb",
        }}
      >
        <CardContent className="flex gap-5">
          <div className="flex items-center mb-4">
            {/* 프로필 이미지 */}
            <img
              src={user?.image || default_profile}
              alt={user?.fullName || "알 수 없음"}
              className="object-cover w-8 h-8 mr-2 rounded-full"
            />
          </div>
          <div className="flex w-full">
            <div className="bg-[#F3F3F3] rounded-[30px] flex-1">
              <TextField
                fullWidth
                inputRef={inputRef}
                variant="standard"
                multiline
                minRows={1}
                maxRows={10}
                slotProps={{
                  input: {
                    style: {
                      fontSize: "16px",
                      lineHeight: "1.5",
                      padding: "23px 10px 0 20px",
                    },
                  },
                }}
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "none",
                  },
                }}
                placeholder={t("댓글을 입력하세요...")}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "8px",
                marginLeft: "15px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#7EACB5",
                  "&:hover": {
                    backgroundColor: "#D5E6E9", // 버튼 호버 시 색상 변경
                  },
                  borderRadius: "50%",
                  width: "4rem",
                  height: "4rem",
                }}
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                <img src={comment} className="w-5" />
              </Button>
              {/* Snackbar */}
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={1000} // 1초 후 자동 닫힘
                onClose={() => handleSnackbarClose()}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  onClose={() => handleSnackbarClose()}
                  severity={snackbarSeverity}
                  sx={{
                    color:
                      snackbarSeverity === "success" ? "#65999F" : "#C96868", // 텍스트 색상
                    backgroundColor:
                      snackbarSeverity === "success" ? "white" : "white", // 배경색
                    border:
                      snackbarSeverity === "success"
                        ? "1px solid #7EACB5"
                        : "1px solid #F56C6C", // 테두리
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                  iconMapping={{
                    success: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="#7EACB5" // Primary 색상
                        width="20"
                        height="20"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ),
                    error: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="#C96868" // 에러 색상
                        width="20"
                        height="20"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4m0 4h.01"
                        />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    ),
                  }}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 댓글 목록 */}
      <List>
        {comments
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((comment) => (
            <div key={comment._id} className="flex items-start mb-20">
              {/* 프로필 이미지 */}
              <div className="flex-shrink-0">
                <Link
                  to={
                    user?.fullName === comment.author.fullName
                      ? `/mypage`
                      : `/userpage/${comment.author.fullName}`
                  }
                  className="block"
                >
                  <img
                    src={comment.author.image || default_profile}
                    alt={comment.author.fullName || "알 수 없음"}
                    className="object-cover rounded-full w-14 h-14"
                  />
                </Link>
              </div>
              {/* 댓글 내용 */}
              <div className="flex-1 ml-4 bg-[#D5E6E9] px-5 py-3 rounded-[8px]">
                {/* 유저 이름과 날짜 */}
                <div className="flex items-center justify-between">
                  <Link
                    to={
                      user?.fullName === comment.author.fullName
                        ? `/mypage`
                        : `/userpage/${comment.author.fullName}`
                    }
                    className="text-sm font-bold text-black hover:no-underline"
                  >
                    {comment.author.fullName || "알 수 없음"}
                  </Link>
                  <span className="text-xs text-gray-500">
                    {formatDateToKorean(comment.createdAt)}
                  </span>
                </div>
                {/* 댓글 텍스트 */}
                <p className="mt-3 text-sm leading-relaxed text-black">
                  {comment.comment}
                </p>
                {/* 삭제 버튼 */}
                <div className="flex justify-end mt-2">
                  <button
                    className="text-xs text-[#C96868] hover:underline"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    {t("삭제")}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </List>
    </Box>
  );
};
export default CommentComponent;
