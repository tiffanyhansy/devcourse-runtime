import React from "react";
import { Snackbar, Alert } from "@mui/material";
import useSnackbarStore from "../../store/store";

const SnackbarComponent: React.FC = () => {
  const { snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } =
    useSnackbarStore();

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000} // 2초 후 자동 닫힘
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbarSeverity}
        sx={{
          color: snackbarSeverity === "success" ? "#65999F" : "#C96868", // 텍스트 색상
          backgroundColor: snackbarSeverity === "success" ? "white" : "white", // 배경색
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
  );
};

export default SnackbarComponent;
