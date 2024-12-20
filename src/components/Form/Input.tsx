import {
  createTheme,
  ThemeProvider,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
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
  autoComplete?: string;
};

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0px 1000px white inset",
            WebkitTextFillColor: "black",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&:has(+ .MuiOutlinedInput-root > .MuiOutlinedInput-input:-webkit-autofill)":
            {
              transform: "translate(14px, -9px) scale(0.75)",
              marginLeft: "0px",
              backgroundColor: "white",
            },
        },
      },
    },
  },
});

export default function Input({
  label,
  type,
  value,
  onChange,
  error,
  helperText,
  autoComplete,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <TextField
          autoComplete={autoComplete}
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
              color: error ? "#d32f2f" : "#7EACB5",
            },
            "& label": {
              marginLeft: "8px",
              fontSize: "16px",
              "&.MuiInputLabel-shrink": {
                marginLeft: "0px",
                fontSize: "16px",
              },
            },
            "& .MuiOutlinedInput-root": {
              height: "52px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: error ? 2 : 1,
                borderColor: error ? "#d32f2f" : "#cdcdcd",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: 2,
                borderColor: error ? "#d32f2f" : "#cdcdcd",
              },
              "& .MuiOutlinedInput-root:hover + .MuiInputLabel-root": {
                color: "#7EACB5",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: 2,
                borderColor: error ? "#d32f2f" : "#7EACB5",
              },
              "& input": {
                padding: "0 24px",
                height: "100%",
                lineHeight: 1,
                boxSizing: "border-box",
              },
              "& fieldset": {
                borderRadius: "10px",
              },
            },
          }}
          slotProps={{
            input: {
              endAdornment: type === "password" && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
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
      </ThemeProvider>
    </>
  );
}
