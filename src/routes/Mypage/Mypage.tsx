import { Stack, Chip, Button, Box, Typography, Alert } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import Input from "../../components/Mypage/Input";

const Mypage = () => {
  const initialProfilePic = "/src/asset/capybara_image.jpg"; // 초기 프로필 사진
  const [clickedField, setClickedField] = useState<Set<number>>(new Set());
  const [isEditable, setIsEditable] = useState(false); // 프로필 편집 가능 여부
  const [profilePic, setProfilePic] = useState<string>(initialProfilePic); // 프로필 사진
  const [tempProfilePic, setTempProfilePic] =
    useState<string>(initialProfilePic); // 편집 중 임시 프로필 사진
  const [tempClickedField, setTempClickedField] = useState<Set<number>>(
    new Set(clickedField)
  ); // 편집 중 임시 필드 선택 상태

  // Field labels
  const fieldLabels = ["SW", "SI", "DA", "GE"];

  const handleFieldClick = (index: number) => {
    const updatedField = new Set(tempClickedField);
    if (updatedField.has(index)) {
      updatedField.delete(index);
    } else {
      updatedField.add(index);
    }
    setTempClickedField(updatedField);
  };

  // 프로필 편집 버튼
  const handleEditButtonClick = () => {
    if (isEditable) {
      // 변경사항 저장
      setProfilePic(tempProfilePic);
      setClickedField(tempClickedField);
    } else {
      // 편집 시작
      setTempProfilePic(profilePic);
      setTempClickedField(new Set(clickedField));
    }
    setIsEditable(!isEditable); // 편집 모드 토글
  };

  // 취소 버튼
  const handleCancelButtonClick = () => {
    // 변경사항 무효화
    setTempProfilePic(profilePic);
    setTempClickedField(new Set(clickedField));
    setIsEditable(false); // 편집 모드 종료
  };

  // 파일 선택
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setTempProfilePic(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <section className="p-5 pt-8 overflow-hidden h-[100vh]">
      {/* 제목 */}
      <article className="flex ml-10 mt-14">
        <h1 className="text-4xl font-bold">내 프로필</h1>
      </article>

      <div className="flex p-[5rem] justify-between ">
        {/* 프로필 */}
        <Stack
          direction="column"
          className="items-center"
          sx={{
            width: "fit",
            marginLeft: "5rem",
          }}
        >
          <Box
            position="relative"
            width={"22.5rem"}
            height={"22.5rem"}
            mx="auto"
            mb={3}
            borderRadius="50%"
            overflow="hidden"
            boxShadow={3}
            sx={{
              cursor: isEditable ? "pointer" : "default",
            }}
            onClick={() =>
              isEditable && document.getElementById("fileInput")?.click()
            }
          >
            <img
              src={isEditable ? tempProfilePic : profilePic}
              alt="Profile"
              style={{
                width: '"100%"',
                height: "100%",
                objectFit: "cover",
                cursor: isEditable ? "pointer" : "not-allowed",
              }}
            />
            {isEditable && (
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bgcolor="rgba(0, 0, 0, 0.2)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="white" fontWeight="bold" fontSize="20px">
                  사진 수정하기
                </Typography>
              </Box>
            )}
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>
          <div className="flex flex-col items-center ">
            <Typography
              sx={{
                fontSize: "48px",
                fontWeight: "bold",
              }}
            >
              Jomyeong
            </Typography>

            {/* 이메일 */}
            <div className="flex items-center gap-4 w-fit">
              <div className="flex items-center justify-center p-2 bg-gray-100 rounded-full">
                <EmailIcon sx={{ color: "#7EACB5" }} />
              </div>
              <Typography variant="body1" className="text-gray-600">
                alexarawles@gmail.com
              </Typography>
            </div>
          </div>
        </Stack>

        <div className="">
          {/* Name, Nickname, Website */}
          <Input isEditable={isEditable} label="Name" />
          <Input isEditable={isEditable} label="Nickname" />
          <Input isEditable={isEditable} label="Website" />
          {/* field */}
          <Stack direction="column" spacing={1}>
            <label
              style={{
                fontSize: "20px",
              }}
            >
              Field
            </label>

            <Stack direction="row" spacing={1} mt={1}>
              {fieldLabels.map((label, index) => (
                <Chip
                  key={index}
                  label={label}
                  variant="filled"
                  onClick={
                    isEditable ? () => handleFieldClick(index) : undefined
                  }
                  style={{
                    width: "3rem",
                    backgroundColor: tempClickedField.has(index)
                      ? isEditable
                        ? "#7EACB5"
                        : "#B0B0B0"
                      : "",
                    color: tempClickedField.has(index)
                      ? "white"
                      : isEditable
                      ? "#000"
                      : "",
                    cursor: isEditable ? "pointer" : "not-allowed",
                    opacity: isEditable ? 1 : 0.6,
                  }}
                />
              ))}
            </Stack>
          </Stack>

          {/* 버튼들 */}
          <Stack
            direction="row"
            spacing={2}
            mt={3}
            style={{ justifyContent: "end" }}
          >
            {isEditable && (
              <Button
                onClick={handleCancelButtonClick}
                variant="contained"
                sx={{
                  color: "#000000",
                  backgroundColor: "#D6D6D6",
                  fontWeight: "bold",
                }}
              >
                취소
              </Button>
            )}
            <Button
              onClick={handleEditButtonClick}
              variant="contained"
              sx={{ backgroundColor: "#7EACB5", fontWeight: "bold" }}
            >
              {isEditable ? "변경사항 저장" : "프로필 편집"}
            </Button>
          </Stack>
          <Alert
            severity="error"
            sx={{ width: "500px", marginTop: "1.5rem", justifySelf: "end" }}
          >
            이후에 로직 추가할 예정입니다.
          </Alert>
        </div>
      </div>
    </section>
  );
};

export default Mypage;
