import React from "react";
import { Stack } from "@mui/material";

interface InputProps {
  isEditable?: boolean;
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
  const isRequiredProfile = ["ID", "Nickname", "닉네임"].includes(label);

  const isWebsiteField = label === "Website";
  const getWebsite = (value: string) => {
    if (typeof value === "string" && value !== "-") {
      return value.startsWith("http") ? value : `https://${value}`;
    }
    return null;
  };
  const link = getWebsite(value);

  return (
    <Stack direction="column" spacing={1}>
      <label
        htmlFor={`input-field-${label}`}
        style={{
          fontSize: "20px",
        }}
      >
        {label}
        {isRequiredProfile && <span style={{ color: "#E14444" }}>*</span>}
      </label>

      {!isEditable && isWebsiteField && link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "37rem",
            height: "3rem",
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 1rem",
            backgroundColor: "#F9F9F9",
            borderRadius: "10px",
            fontSize: "16px",
            color: "black",
            textDecoration: "underline",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            marginBottom: "3rem",
          }}
        >
          {value}
        </a>
      ) : (
        <input
          id={`input-field-${label}`}
          type="text"
          disabled={!isEditable}
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
      )}
    </Stack>
  );
};

export default Input;
