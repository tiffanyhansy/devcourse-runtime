import React, { useState, useEffect } from "react";
import { useCommentStore } from "../../store/comment";
import { Author_T, Post_T, PostComment } from "../../api/api";
import { useLoginStore } from "../../store/API";
import { Link } from "react-router";
import default_profile from "../../asset/default_profile.png";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  Box,
} from "@mui/material";

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
}) => {
  //로그인 유저 정보 가져오기
  const { posts, addCommentToPost, deleteComment } = useCommentStore();
  const user = useLoginStore((state) => state.user);

  //요기 이뿌게 꾸며야될텐데...
  if (!user) {
    return <div>로그인 정보가 없습니다.</div>;
  }

  const [newComment, setNewComment] = useState<string>("");

  // 현재 게시물 가져오기
  const currentPost = posts.find((post) => post._id === postId);

  useEffect(() => {
    if (!currentPost && posts.length > 0) {
      console.error("해당 postId에 해당하는 게시물이 없습니다.");
    }
  }, [currentPost, posts]);

  //나중에 이쁘게 꾸밀 수 있을 지도..
  if (!posts.length) {
    return <Typography>로딩 중입니다...</Typography>;
  }

  //오류 체크
  if (!currentPost) {
    return <Typography>해당 게시물을 찾을 수 없습니다.</Typography>;
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await addCommentToPost(postId, newComment);
      setNewComment(""); // 입력 필드 초기화
      alert("댓글이 성공적으로 작성되었습니다.");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      alert("댓글이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  //날짜 포멧
  const formatDateToKorean = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const formattedHours = isPM ? hours - 12 || 12 : hours; // 12시간제 표현
    const period = isPM ? "오후" : "오전";

    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${period} ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box className="relative w-[90%] md:w-[100%] mt-12">
      {/* 댓글 입력 */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <div className="flex items-center mb-4">
            {/* 프로필 이미지 */}
            <img
              src={user.image || default_profile}
              alt={user.fullName || "알 수 없음"}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />

            {/* 프로필 이름 */}
            <span className="font-bold">{user.fullName || "알 수 없음"}</span>
          </div>
          <div style={{ marginTop: "16px" }}>
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
                    padding: "8px 0",
                  },
                },
              }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid #ccc",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid #7EACB5",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "1px solid #7EACB5",
                },
              }}
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "8px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#7EACB5",
                  "&:hover": {
                    backgroundColor: "#65999F", // 버튼 호버 시 색상 변경
                  },
                }}
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                댓글 작성
              </Button>
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
                    user.fullName === comment.author.fullName
                      ? `/mypage`
                      : `/userpage/${comment.author.fullName}`
                  }
                  className="block"
                >
                  <img
                    src={comment.author.image || default_profile}
                    alt={comment.author.fullName || "알 수 없음"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Link>
              </div>

              {/* 댓글 내용 */}
              <div className="flex-1 ml-4">
                {/* 유저 이름과 날짜 */}
                <div className="flex items-center justify-between">
                  <Link
                    to={
                      user.fullName === comment.author.fullName
                        ? `/mypage`
                        : `/userpage/${comment.author.fullName}`
                    }
                    className="font-bold text-sm text-black hover:underline"
                  >
                    {comment.author.fullName || "알 수 없음"}
                  </Link>
                  <span className="text-xs text-gray-500">
                    {formatDateToKorean(comment.createdAt)}
                  </span>
                </div>

                {/* 댓글 텍스트 */}
                <p className="text-sm text-black mt-1 leading-relaxed">
                  {comment.comment}
                </p>

                {/* 삭제 버튼 */}
                <div className="flex justify-end mt-2">
                  <button
                    className="text-xs text-red-500 hover:underline"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    삭제
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
