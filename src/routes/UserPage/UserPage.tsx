import { Stack, Chip, Box, Typography, Alert, Tooltip } from "@mui/material";
import Input from "../../components/Mypage/Input";
import { useProfileStore } from "../../store/store";
import Button from "../../components/common/SquareButton";

const UserPage = () => {
  const {
    clickedField,
    isEditable,
    profilePic,
    tempProfilePic,
    fullName,
    username,
    website,
    tempClickedField,
    setClickedField,
    setIsEditable,
    setProfilePic,
    setTempProfilePic,
    setFullName,
    setUsername,
    setWebsite,
    setTempClickedField,
  } = useProfileStore();

  const isAnyFieldEmpty = !fullName.trim() || !username.trim();

  const handleEditButtonClick = () => {
    if (isEditable) {
      if (isAnyFieldEmpty) {
        alert("필수 항목을 모두 입력해주세요.");
        return;
      }
      setProfilePic(tempProfilePic);
      setClickedField(tempClickedField);
    } else {
      setTempProfilePic(profilePic);
      setTempClickedField(new Set(clickedField));
    }
    setIsEditable(!isEditable);
  };

  const handleCancelButtonClick = () => {
    setTempProfilePic(profilePic);
    setTempClickedField(new Set(clickedField));
    setIsEditable(false);
  };

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

  const fieldLabels = ["SW", "SI", "DA", "GE"];
  const fieldDescriptions = [
    "소프트웨어 개발",
    "시스템/인프라",
    "데이터/AI 개발",
    "게임/QA",
  ];

  const handleFieldClick = (index: number) => {
    const updatedField = new Set(tempClickedField);
    if (updatedField.has(index)) {
      updatedField.delete(index);
    } else {
      updatedField.add(index);
    }
    setTempClickedField(updatedField);
  };

  return (
    <section className="p-5 pt-8 overflow-hidden h-[100vh]">
      {/* 제목 */}
      <article className="flex mt-14">
        {/* username 즉, id */}
        <h1 className="text-4xl font-bold">Jomyeong님의 프로필</h1>
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
              src={isEditable ? tempProfilePic : profilePic}
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
            {/* username 즉, id */}
            <Typography
              sx={{
                fontSize: "48px",
                fontWeight: "bold",
              }}
            >
              Jomyeong
            </Typography>

            {/* 팔로우하기 */}
            <Button
              variant="primary"
              size="sm"
              textSize="sm"
              className="hover:bg-[#96ccd6]"
            >
              팔로우하기
            </Button>
          </div>
        </Stack>

        {/* 필드 */}
        <div>
          <Input
            isEditable={isEditable}
            label="이름"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            isEditable={isEditable}
            label="별명"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            isEditable={isEditable}
            label="웹사이트"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
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
                </Tooltip>
              ))}
            </Stack>
          </Stack>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
