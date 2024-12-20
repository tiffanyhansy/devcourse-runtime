import { t } from "i18next";
import { useEditorStore } from "../../store/store";
import Button from "../common/SquareButton";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function LoginDialog() {
  const { isAlertOpen, closeLoginDialog } = useEditorStore(); // zustand에서 가져옴

  return (
    <Dialog
      open={isAlertOpen}
      onClose={closeLoginDialog}
      aria-labelledby="login-prompt-title"
      aria-describedby="login-prompt-description"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "10px",
          padding: "20px",
          alignItems: "center",
          fontFamily: "S-CoreDream-3Light",
        },
      }}
    >
      <div
        className="flex items-center justify-center p-2 bg-[#FEF3F2] rounded-full"
        style={{ width: "4rem", height: "4rem" }}
      >
        <div className="flex items-center justify-center p-[2px] bg-[#FEE4E2] rounded-full">
          <ErrorOutlineIcon
            sx={{ width: "3rem", height: "3rem", color: "#E14444" }}
          />
        </div>
      </div>
      <DialogTitle
        id="login-prompt-title"
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "4px",
        }}
      >
        {t("로그인이 필요합니다")}
      </DialogTitle>

      <DialogActions>
        {/* 닫기 버튼 */}
        <Button
          size="md"
          textSize="sm"
          variant="todo"
          className="border-2 border-[#e7e7e7] border-solid text-gray-700 hover:bg-gray-100 "
          onClick={closeLoginDialog}
          color="inherit"
        ></Button>
        {/* 로그인 버튼 */}
        <Button
          size="md"
          textSize="sm"
          variant="custom"
          className="bg-[#7EACB5] hover:bg-[#90bdc7]"
          onClick={() => {
            closeLoginDialog();
            window.location.href = "/login"; // 로그인 페이지로 이동
          }}
        >
          {t("로그인")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
