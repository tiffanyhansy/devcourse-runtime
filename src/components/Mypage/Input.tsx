import React from "react";
import { Stack } from "@mui/material";

interface InputProps {
  isEditable: boolean; // 편집 가능 여부
  label: string; // 필드 라벨
}

const Input = ({ isEditable, label }: InputProps) => {
  return (
    <Stack direction="column" spacing={1}>
      {/* 필드 라벨 */}
      <label
        htmlFor={`input-field-${label}`}
        style={{
          fontSize: "20px",
        }}
      >
        {label}
      </label>

      {/* 입력 필드 */}
      <input
        id={`input-field-${label}`}
        type="text"
        disabled={!isEditable} // isEditable이 false일 때 비활성화
        style={{
          width: "37rem",
          height: "3rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#F9F9F9", // 편집 가능 여부에 따라 배경색 변경
          border: isEditable ? "1px solid #ccc" : "none",
          borderRadius: "10px",
          outline: "none",
          fontSize: "16px",
          color: "#333",
          marginBottom: "3rem",
        }}
      />
    </Stack>
  );
};

export default Input;