// react
import React, { useEffect } from "react";
// MUI
import { Stack, Chip, Box, Typography, Alert, Tooltip } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

// 커스텀 component
import Input from "../../components/Mypage/Input";
import Button from "../../components/common/SquareButton";
import ProfileSkeleton from "../../components/Mypage/ProfileSkeleton";

// Store
import { useProfileStore } from "../../store/store";
import { useLoginStore } from "../../store/API";

// API
import { axiosInstance } from "../../api/axios";

//이미지
import default_profile from "../../asset/default_profile.png";

const Mypage = () => {
  const setUser = useLoginStore((state) => state.setUser);
  const parsedField = useProfileStore((state) => state.parsedField);
  const setParsedField = useProfileStore((state) => state.setParsedField);

  const getAuthUser = async () => {
    const newUser = await (await axiosInstance.get(`/auth-user`)).data;

    // username 문자열 처리
    if (typeof newUser.username === "string") {
      try {
        // JSON 형식의 문자열인지 확인 후 파싱
        newUser.username =
          newUser.username.startsWith("{") && newUser.username.endsWith("}")
            ? JSON.parse(newUser.username.replace(/'/g, '"'))
            : newUser.username; // 유효한 JSON 형식이 아니면 그대로
      } catch (error) {
        console.error("Error parsing username as JSON:", error);

        newUser.username = "defaultUsername"; // 기본값
      }
    }

    localStorage.setItem("LoginUserInfo", JSON.stringify(newUser));
    setUser(newUser);

    setParsedField(newUser.username ? newUser.username.field : []);
    setProfilePic(newUser.image);
    setFullName(newUser.fullName);
    setUsername(newUser.username);
  };

  const user = useLoginStore((state) => state.user!);
  const {
    clickedField,
    isEditable,
    image,
    tempProfilePic,
    fullName,
    username,
    tempClickedField,
    isLoading,
    setClickedField,
    setIsEditable,
    setProfilePic,
    setTempProfilePic,
    setFullName,
    setUsername,
    setTempClickedField,
    setIsLoading,
  } = useProfileStore();

  useEffect(() => {
    getAuthUser();
    setIsLoading(false);
  }, []);

  // 이미지 업로드 함수
  const uploadProfileImage = async (imageFile: File, isCover: boolean) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("isCover", isCover.toString()); // boolean 값을 문자열로 변환해 전송

      const response = await axiosInstance.post(
        "/users/upload-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error uploading profile image:", error);
      throw error;
    }
  };

  const handleEditButtonClick = async () => {
    setTempClickedField(user.username ? [...user.username?.field] : []);

    const isAnyFieldEmpty =
      !fullName?.trim() || !username || !username.username.trim();

    if (isEditable) {
      if (isAnyFieldEmpty) {
        alert("닉네임을 입력해주세요.");
        return;
      }

      try {
        // 프로필 사진 업로드 (tempProfilePic 값이 존재할 때만 실행)
        if (tempProfilePic && tempProfilePic instanceof File) {
          await uploadProfileImage(tempProfilePic, false);
        }

        // username, website, field 업데이트
        const payload = {
          username: username?.username,
          website: username?.website,
          field: tempClickedField,
        };

        const payloadString = JSON.stringify(payload);
        const updateUserData = {
          fullName: fullName,
          username: payloadString,
        };

        await axiosInstance.put("/settings/update-user", updateUserData);

        // 상태 업데이트
        setUsername(payload);
        setClickedField(parsedField);

        await getAuthUser();
        setTempProfilePic(image);
        alert("변경사항이 저장되었습니다.");
      } catch (error) {
        console.error("❌ 변경사항 저장에 실패했습니다.", error);

        alert("변경사항 저장 중 오류가 발생했습니다.");
      }
    }

    setIsEditable(!isEditable);
  };

  const handleCancelButtonClick = () => {
    setTempProfilePic(image);
    setTempClickedField(clickedField);
    setIsEditable(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      const file = event.target.files?.[0];
      if (file) {
        setTempProfilePic(file);
      }
    }
  };

  const fieldLabels = ["SW", "SI", "DA", "GE"];
  const fieldDescriptions = [
    "소프트웨어 개발",
    "시스템/인프라",
    "데이터/AI 개발",
    "게임/QA",
  ];

  const handleFieldClick = (index: number) => {
    const updatedField = [...tempClickedField];

    if (updatedField.includes(index.toString())) {
      const idx = updatedField.indexOf(index.toString());
      updatedField.splice(idx, 1); // 필드 제거
    } else {
      updatedField.push(index.toString()); // 필드 추가
    }
    setTempClickedField(updatedField);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <section className="p-5 pt-8 overflow-hidden h-[100vh]">
      <article className="flex mt-14">
        <h1 className="text-4xl font-bold">내 프로필</h1>
      </article>

      <div className="flex p-[5rem] justify-between">
        <Stack direction="column" className="items-center">
          <Box
            position="relative"
            width="22.5rem"
            height="22.5rem"
            mx="auto"
            mb={3}
            borderRadius="50%"
            overflow="hidden"
            boxShadow={3}
            sx={{ cursor: isEditable ? "pointer" : "default" }}
            onClick={() =>
              isEditable && document.getElementById("fileInput")?.click()
            }
          >
            <img
              src={
                isEditable
                  ? tempProfilePic instanceof File
                    ? URL.createObjectURL(tempProfilePic) // File일 경우 URL 생성
                    : image || default_profile // string URL일 경우
                  : image || default_profile
              }
              alt="Profile"
              style={{
                width: "100%",
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
              {user.fullName}
            </Typography>

            <div className="flex items-center gap-4 w-fit">
              <div className="flex items-center justify-center p-2 bg-gray-100 rounded-full">
                <EmailIcon sx={{ color: "#7EACB5" }} />
              </div>
              <Typography variant="body1" className="text-gray-600">
                {user.email}
              </Typography>
            </div>
          </div>
        </Stack>

        <div>
          <Input
            label="ID"
            value={user.fullName}
            readonly={true}
            isEditable={isEditable}
          />
          <Input
            isEditable={isEditable}
            label="닉네임"
            value={
              isEditable
                ? username?.username || ""
                : user.username?.username || "" // user.username이 없을 경우 fullName 처리
            }
            onChange={(e) => {
              if (isEditable) {
                setUsername({
                  ...username,
                  username: e.target.value,
                });
              }
            }}
          />
          <Input
            isEditable={isEditable}
            label="Website"
            value={
              isEditable
                ? username?.website || ""
                : user.username?.website || ""
            }
            onChange={(e) => {
              if (isEditable) {
                setUsername({
                  ...username,
                  website: e.target.value,
                });
              }
            }}
          />

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
                <Tooltip key={index} title={fieldDescriptions[index]} arrow>
                  <Chip
                    key={index}
                    label={label}
                    variant="filled"
                    onClick={
                      isEditable ? () => handleFieldClick(index) : undefined
                    }
                    style={{
                      width: "3rem",
                      backgroundColor: isEditable
                        ? tempClickedField.includes(index.toString())
                          ? "#7EACB5"
                          : "#B0B0B0"
                        : parsedField.includes(index.toString())
                        ? "#7EACB5"
                        : "#B0B0B0",
                      color: "white",
                      cursor: isEditable ? "pointer" : "not-allowed",
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            mt={3}
            style={{ justifyContent: "end" }}
          >
            {isEditable && (
              <Button
                onClick={handleCancelButtonClick}
                size="sm"
                variant="custom"
                className="bg-[#c0c0c0] w-fit px-8 hover:bg-[#D6D6D6]"
                textSize="sm"
              >
                취소
              </Button>
            )}
            <Button
              onClick={handleEditButtonClick}
              variant="primary"
              textSize="sm"
              size="md"
              className="hover:bg-[#96ccd6]"
            >
              {isEditable ? "변경사항 저장" : "프로필 편집"}
            </Button>
          </Stack>

          {isEditable &&
            (!fullName?.trim() || !username || !username.username?.trim()) && (
              <Alert
                severity="error"
                sx={{ mt: 3, width: "500px", justifySelf: "end" }}
              >
                닉네임을 적어주세요!
              </Alert>
            )}
        </div>
      </div>
    </section>
  );
};

export default Mypage;
