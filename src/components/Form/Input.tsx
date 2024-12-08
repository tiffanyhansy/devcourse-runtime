import { TextField } from "@mui/material";

type InputProps = {
  type: string;
  value: string;
};

export default function Input({ type, value}: InputProps) {
  return (
    <>
      <TextField
        id="outlined-basic"
        label={value}
        type={type}
        variant="outlined"
        sx={{
          width: 384,
          "& .MuiOutlinedInput-root": {
            height: "64px", // 전체 높이 설정
            "& input": {
              padding: "0 16px", // 수평 패딩만 설정
              height: "100%", // 입력 필드가 부모 높이와 동일하게
              lineHeight: 1,
              boxSizing: "border-box", // 패딩 포함 크기 계산
            },
            "& fieldset": {
              borderRadius: "10px", // 필드셋의 모서리 둥글게
            },
          },
        }}
      />
    </>
  );
}
