import { useEditorStore } from "../../store/store";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export default function LoginDialog() {
  const { isAlertOpen, closeLoginDialog } = useEditorStore(); // zustand에서 가져옴

  return (
    <Dialog
      open={isAlertOpen}
      onClose={closeLoginDialog}
      aria-labelledby="login-prompt-title"
      aria-describedby="login-prompt-description"
    >
      <DialogTitle id="login-prompt-title">로그인이 필요합니다</DialogTitle>
      <DialogContent>
        <Typography id="login-prompt-description" variant="body1" gutterBottom>
          글쓰기 기능은 로그인 후에 이용 가능합니다.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          지금 로그인하거나 회원가입을 진행해주세요.
        </Typography>
      </DialogContent>
      <DialogActions>
        {/* 회원가입 버튼 */}
        <Button
          onClick={() => {
            closeLoginDialog();
            window.location.href = "/join"; // 회원가입 페이지로 이동
          }}
          color="secondary"
        >
          회원가입
        </Button>
        {/* 로그인 버튼 */}
        <Button
          onClick={() => {
            closeLoginDialog();
            window.location.href = "/login"; // 로그인 페이지로 이동
          }}
          color="primary"
        >
          로그인
        </Button>
        {/* 닫기 버튼 */}
        <Button onClick={closeLoginDialog} color="inherit">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
