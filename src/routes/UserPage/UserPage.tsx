import { Stack, Chip, Box, Typography, Tooltip } from "@mui/material";
import Input from "../../components/Mypage/Input";
import { useProfileStore } from "../../store/store";
import Button from "@mui/material/Button";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";
import { followType, userType } from "../../api/api";
import { useLoginStore } from "../../store/API";

const UserPage = () => {
  const {
    isEditable,
    profilePic,
    tempProfilePic,
    fullName,
    username,
    website,
    tempClickedField,

    setTempProfilePic,
    setFullName,
    setUsername,
    setWebsite,
    setTempClickedField,
  } = useProfileStore();

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

  const user = useLoginStore((state) => state.user);
  const setUser = useLoginStore((state) => state.setUser);

  const deleteUnFollow = async (id: string) => {
    // 언팔로우 요청을 보내는 코드 안에 유저정보 업데이트 함수까지 실행시켜야 즉각적인 업데이트가 가능하다.
    try {
      const unfollowed = (
        await axiosInstance.delete(`/follow/delete`, {
          data: {
            id: id,
          },
        })
      ).data;
      const updateUser = { ...user! };
      const updateFollow = updateUser.following.filter((e: followType) => {
        return e._id !== unfollowed._id;
      });
      updateUser.following = updateFollow;
      console.log(updateUser);
      setUser(updateUser);
    } catch (error) {
      console.log(error);
    }
  };

  const postFollow = async (id: string) => {
    // 팔로우 요청을 보내는 코드 안에 유저정보 업데이트 함수까지 실행시켜야 즉각적인 업데이트가 가능하다.
    try {
      const followed = (
        await axiosInstance.post(`follow/create`, { userId: id })
      ).data;
      const updateUser = { ...user! };
      updateUser.following.push(followed);
      setUser(updateUser);
      localStorage.setItem("LoginUserInfo", JSON.stringify(updateUser));
    } catch (error) {
      console.log(error);
    }
  };

  // params로 유저 정보 불러오기
  const [searchUsers, setSearchUsers] = useState<userType | null>(null);

  const params = useParams();

  const getSearchUsers = async () => {
    const searchUsersData: userType = await (
      await axiosInstance.get(`/search/users/${params.fullname}`)
    ).data[0];
    console.log(searchUsersData);
    setSearchUsers(searchUsersData);
  };

  useEffect(() => {
    getSearchUsers();
  }, []);

  return (
    <section className="p-5 pt-8 overflow-hidden h-[100vh]">
      {/* 제목 */}
      <article className="flex mt-14">
        {/* username 즉, id */}
        <h1 className="text-4xl font-bold">{`${searchUsers?.fullName}님의 프로필`}</h1>
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
                searchUsers?.coverImage
                  ? searchUsers.coverImage
                  : `/src/asset/default_profile.png`
              }
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                cursor: isEditable ? "pointer" : "not-allowed",
              }}
            />

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
              {searchUsers?.username
                ? searchUsers.username
                : searchUsers?.fullName}
            </Typography>

            {/* 팔로우하기 */}
            {user !== null ? (
              user.following.find(
                (e: followType) => e.user === searchUsers?._id
              ) ? ( // following하고 있는 유저명과 로그인 유저가 일치하면 언팔로우 버튼 활성화
                <Button
                  variant="contained"
                  sx={{
                    color: "#C96868",
                    backgroundColor: "white",
                    fontWeight: "bold",
                    border: "1px solid #C96868",
                    width: "118px",
                  }}
                  onClick={() => {
                    deleteUnFollow(
                      user.following.find(
                        (e: followType) => e.user === searchUsers?._id
                      )!._id
                    );
                  }}
                >
                  언팔로우
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: "bold",
                    border: "1px solid black",
                    width: "118px",
                  }}
                  onClick={() => {
                    postFollow(searchUsers!._id);
                  }}
                >
                  팔로잉
                </Button>
              )
            ) : null}
          </div>
        </Stack>

        {/* 필드 */}
        <div>
          <Input
            isEditable={isEditable}
            label="ID"
            value={searchUsers?.fullName ? searchUsers.fullName : "error"} // 이거 왜 searchUsers?.fullName만 넣으면 데이터 바인딩 오류 나오지? 데이터 있는데?
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            isEditable={isEditable}
            label="닉네임"
            value={
              searchUsers?.username
                ? searchUsers.username
                : searchUsers?.fullName
                ? searchUsers.fullName
                : "error"
            }
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
