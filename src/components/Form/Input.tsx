import { TextField, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

type InputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: string;
};

export default function Input({
  label,
  type,
  value,
  onChange,
  error,
  helperText,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <TextField
        label={label}
        type={showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        variant="outlined"
        sx={{
          width: 384,
          "& .MuiInputLabel-root.Mui-focused": {
            color: error ? "#d32f2f" : "#7EACB5", // 포커스 시 라벨 색상
          },

          "& label": {
            marginLeft: "8px", // 기본 마진 (포커스되지 않았을 때)
            marginTop: "-1px",
            fontSize: "16px",
            "&.MuiInputLabel-shrink": {
              marginLeft: "0px", // 포커스되었을 때 마진 제거
              fontSize: "16px",
            },
          },
          "& .MuiOutlinedInput-root": {
            height: "52px", // 전체 높이 설정
            "& .MuiOutlinedInput-notchedOutline": {
              border: error ? 2 : 1,
              borderColor: error ? "#d32f2f" : "#cdcdcd", // 기본 테두리 색상
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: 2,
              borderColor: error ? "#d32f2f" : "#cdcdcd",
            },
            "& .MuiOutlinedInput-root:hover + .MuiInputLabel-root": {
              color: "#7EACB5", // 입력 필드에 호버했을 때 라벨 색상 변경
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: 2,
              borderColor: error ? "#d32f2f" : "#7EACB5", // 포커스 시 테두리 색상
            },
            "& input": {
              padding: "0 24px", // 수평 패딩만 설정
              height: "100%", // 입력 필드가 부모 높이와 동일하게
              lineHeight: 1,
              boxSizing: "border-box", // 패딩 포함 크기 계산
            },
            "& fieldset": {
              borderRadius: "10px", // 필드셋의 모서리 둥글게
            },
          },
        }}
        slotProps={{
          input: {
            endAdornment: type === "password" && (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? (
                    <VisibilityOutlinedIcon color="disabled" />
                  ) : (
                    <VisibilityOffOutlinedIcon color="disabled" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
}
