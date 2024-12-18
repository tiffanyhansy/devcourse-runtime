import React from "react";
import { Stack } from "@mui/material";

interface InputProps {
  isEditable: boolean;
  label: string;
  value: string;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  isEditable,
  label,
  value,
  onChange,
  readonly,
}: InputProps) => {
  const isRequiredProfile = ["이름", "별명"].includes(label);

  return (
    <Stack direction="column" spacing={1}>
      {/* 필드 라벨 */}
      <label
        htmlFor={`input-field-${label}`}
        style={{
          fontSize: "20px",
        }}
      >
        {label}{" "}
        {isRequiredProfile && <span style={{ color: "#E14444" }}>*</span>}
      </label>

      <input
        id={`input-field-${label}`}
        type="text"
        disabled={!isEditable} // isEditable이 false일 때 비활성화
        style={{
          width: "37rem",
          height: "3rem",
          padding: "0.5rem 1rem",
          backgroundColor: readonly ? "#e6e6e6" : "#F9F9F9",
          border: isEditable ? "1px solid #ccc" : "none",
          borderRadius: "10px",
          outline: "none",
          fontSize: "16px",
          color: "#333",
          marginBottom: "3rem",
        }}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
    </Stack>
  );
};

export default Input;
