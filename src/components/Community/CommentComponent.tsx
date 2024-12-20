import React, { useState, useEffect } from "react";
import { useCommentStore } from "../../store/comment";
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
  postId: string; // Prop으로 전달된 postId
};

const CommentComponent: React.FC<CommentComponentProps> = ({ postId }) => {
  const { posts, addCommentToPost, deleteComment } = useCommentStore();
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
      await deleteComment(commentId); // commentId만 전달
      alert("댓글이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", mx: "auto", mt: 4 }}>
      {/* 댓글 입력 */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="댓글을 입력하세요..."
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            댓글 작성
          </Button>
        </CardContent>
      </Card>

      {/* 댓글 목록 */}
      <List>
        {[...currentPost.comments]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((comment) => (
            <Card key={comment._id} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1">{comment.comment}</Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 1, color: "gray" }}
                >
                  {comment.author.fullName} -{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography>
                <Button
                  variant="text"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  삭제
                </Button>
              </CardContent>
            </Card>
          ))}
      </List>
    </Box>
  );
};

export default CommentComponent;
