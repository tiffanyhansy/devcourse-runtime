import { Stack, Chip, Box, Typography, Alert, Tooltip } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Input from "../../components/Mypage/Input";
import { useProfileStore } from "../../store/store";
import Button from "../../components/common/SquareButton";
import { axiosInstance } from "../../api/axios";
import { useEffect } from "react";
import { useLoginStore } from "../../store/API";
import axios from "axios";

const Mypage = () => {
  const setUser = useLoginStore((state) => state.setUser);

  const getAuthUser = async () => {
    const newUser = await (await axiosInstance.get(`/auth-user`)).data;

    // username 문자열 처리
    if (typeof newUser.username === "string") {
      newUser.username = JSON.parse(newUser.username.replace(/'/g, '"'));
    }

    localStorage.setItem("LoginUserInfo", JSON.stringify(newUser));
    setUser(newUser);
  };

  const user = useLoginStore((state) => state.user!);
  const {
    clickedField,
    isEditable,
    profilePic,
    tempProfilePic,
    fullName,
    username,
    tempClickedField,
    setClickedField,
    setIsEditable,
    setProfilePic,
    setTempProfilePic,
    setFullName,
    setUsername,
    setTempClickedField,
  } = useProfileStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFullName(user.fullName || "");

        // username 문자열 처리
        if (typeof user.username?.username === "string") {
          try {
            // 타입 단언으로 replace 메서드 허용
            user.username.username = JSON.parse(
              (user.username.username as string).replace(/'/g, '"')
            );
          } catch (error) {
            console.error("parse username 안됨:", error);
          }
        }

        setUsername({
          username: user.username?.username || user.fullName || "",
          website: user.username?.website || "",
          field: user.username?.field || "",
        });

        setProfilePic(user.profilePic || "/src/asset/default_profile.png");
        setClickedField(
          typeof user.username?.field === "string" &&
            user.username?.field.trim()
            ? user.username.field.split(",")
            : []
        );

        console.log(user);
        console.log(user.fullName);
        console.log(user.email);
      } catch (error) {
        console.error(`❌사용자의 데이터를 불러오는 데에 실패했습니다.`, error);
      }
    };
    fetchData();
  }, [user, setFullName, setUsername, setProfilePic, setClickedField]);

  const isAnyFieldEmpty = !fullName?.trim() || !username.username?.trim();

  // 이미지 업로드 함수 (재사용 가능하게 분리)
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

      console.log("Profile image uploaded:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading profile image:", error);
      throw error;
    }
  };

  // 메인 함수 수정
  const handleEditButtonClick = async () => {
    if (isEditable) {
      if (isAnyFieldEmpty) {
        alert("필수 항목을 모두 입력해주세요.");
        return;
      }

      try {
        // 1. 프로필 사진 업로드 (tempProfilePic 값이 존재할 때만 실행)
        if (tempProfilePic && tempProfilePic instanceof File) {
          await uploadProfileImage(tempProfilePic, false);
        }

        // 2. username, website, field 업데이트
        const payload = {
          username: username.username,
          website: username.website,
          field: tempClickedField.join(","), // 필드 조합
        };

        await axiosInstance.put("/settings/update-user", payload);

        // 상태 업데이트
        setUsername(payload);
        setClickedField(tempClickedField);

        alert("변경사항이 저장되었습니다.");
        getAuthUser(); // 최신 데이터 불러오기
      } catch (error) {
        console.error("❌ 변경사항 저장에 실패했습니다.", error);
        alert("변경사항 저장 중 오류가 발생했습니다.");
      }
    } else {
      // 수정 모드 시작 시 임시 상태 설정
      setTempProfilePic(profilePic);
      setTempClickedField(clickedField);
    }

    setIsEditable(!isEditable);
  };

  const handleCancelButtonClick = () => {
    setTempProfilePic(profilePic);
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

  return (
    <section className="p-5 pt-8 overflow-hidden h-[100vh]">
      {/* 제목 */}
      <article className="flex mt-14">
        <h1 className="text-4xl font-bold">내 프로필</h1>
      </article>

      <div className="flex p-[5rem] justify-between">
        {/* 프로필 */}
        <Stack direction="column" className="items-center">
          {/* 프로필 사진 */}
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
                    : tempProfilePic // string URL일 경우
                  : profilePic
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

            {/* 이메일 */}
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

        {/* 필드 입력 */}
        <div>
          <Input
            isEditable={isEditable}
            label="이름"
            value={isEditable ? fullName || "" : user.fullName}
            onChange={(e) => isEditable && setFullName(e.target.value)}
          />
          <Input
            isEditable={isEditable}
            label="별명"
            value={
              isEditable
                ? username.username || ""
                : user.username?.username || user.fullName || ""
            }
            onChange={(e) => {
              if (isEditable) {
                setUsername({
                  ...username, // 기존의 username 객체를 그대로 복사
                  username: e.target.value,
                });
              }
            }}
          />
          <Input
            isEditable={isEditable}
            label="웹사이트"
            value={
              isEditable ? username.website || "" : user.username?.website || ""
            }
            onChange={(e) => {
              if (isEditable) {
                setUsername({
                  ...username, // 기존의 username 객체를 그대로 복사
                  website: e.target.value,
                });
              }
            }}
          />
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
                      backgroundColor: tempClickedField.includes(
                        index.toString()
                      )
                        ? isEditable
                          ? "#7EACB5"
                          : "#B0B0B0"
                        : "",
                      color: tempClickedField.includes(index.toString())
                        ? "white"
                        : isEditable
                        ? "#000"
                        : "",
                      cursor: isEditable ? "pointer" : "not-allowed",
                      opacity: isEditable ? 1 : 0.6,
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Stack>
          {/* 버튼 */}
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
          </Stack>{" "}
          {/* 경고 알림 */}
          {isEditable && isAnyFieldEmpty && (
            <Alert
              severity="error"
              sx={{ mt: 3, width: "500px", justifySelf: "end" }}
            >
              이름과 별명 모두 채워주세요!
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
};

export default Mypage;
