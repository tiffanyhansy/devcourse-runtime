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
  const { isEditable, username, fullName, setTempProfilePic } =
    useProfileStore();

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
  //try, catch으로 다시 정렬
  const getSearchUsers = async () => {
    try {
      const searchUsersData: userType = await (
        await axiosInstance.get(`/search/users/${params.fullname}`)
      ).data[0];
      setSearchUsers(searchUsersData);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setSearchUsers(null);
    }
  };

  useEffect(() => {
    if (params.fullname) getSearchUsers();
  }, [params.fullname]);

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
              {searchUsers?.username?.username
                ? searchUsers?.username?.username
                : searchUsers?.fullName}
            </Typography>

            {/* 팔로우하기 */}
            {user?.following?.find(
              (e: followType) => e.user === searchUsers?._id
            ) ? (
              <Button
                variant="contained"
                sx={{
                  color: "#C96868",
                  backgroundColor: "white",
                  fontWeight: "bold",
                  border: "1px solid #C96868",
                  width: "118px",
                }}
                //undefined일 때 로직처리 추가.
                onClick={() => {
                  const followId = user.following.find(
                    (e: followType) => e.user === searchUsers?._id
                  )?._id;
                  if (followId) deleteUnFollow(followId);
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
                  if (searchUsers?._id) postFollow(searchUsers._id);
                }}
              >
                팔로잉
              </Button>
            )}
          </div>
        </Stack>

        {/* 필드 */}
        <div>
          <Input
            isEditable={isEditable}
            label="ID"
            value={searchUsers?.fullName ? searchUsers.fullName : "error"} // 이거 왜 searchUsers?.fullName만 넣으면 데이터 바인딩 오류 나오지? 데이터 있는데?
          />
          <Input
            isEditable={isEditable}
            label="닉네임"
            value={
              searchUsers?.username?.username
                ? searchUsers?.username?.username
                : searchUsers?.fullName
                ? searchUsers.fullName
                : "error"
            }
          />
          <Input
            isEditable={isEditable}
            label="웹사이트"
            value={searchUsers?.username?.website!}
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
                    style={{
                      width: "3rem",
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
