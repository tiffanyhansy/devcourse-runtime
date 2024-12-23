import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useTimeSetterStore } from "../../store/store";

export const SetTimeSnackbarComponent: React.FC = () => {
  const { isTimerSnackbarOpen, setIsTimerSnackbarOpenFalse } =
    useTimeSetterStore();

  return (
    <Snackbar
      open={isTimerSnackbarOpen}
      autoHideDuration={1500} // 1.5초 후 자동 닫힘
      onClose={setIsTimerSnackbarOpenFalse}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={setIsTimerSnackbarOpenFalse}
        sx={{
          color: "#65999F",
          backgroundColor: "white", // 배경색
          border: "1px solid #7EACB5",
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
        {"목표시간이 설정되었습니다."}
      </Alert>
    </Snackbar>
  );
};
