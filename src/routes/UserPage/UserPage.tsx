import { Stack, Chip, Box, Typography, Tooltip } from "@mui/material";
import Input from "../../components/Mypage/Input";
import Button from "@mui/material/Button";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";
import { followType, userType } from "../../api/api";
import { useLoginStore } from "../../store/API";
import { t } from "i18next";
import default_profile from "../../asset/default_profile.png";
import { useNotificationsStore } from "../../store/notificationsStore";
import SelectLanguageButton from "../../components/locales/SelectLanguageButton";

const UserPage = () => {
  const fieldLabels = ["SW", "SI", "DA", "GE"];
  const fieldDescriptions = [
    "소프트웨어 개발",
    "시스템/인프라",
    "데이터/AI 개발",
    "게임/QA",
  ];

  const user = useLoginStore((state) => state.user);
  const token = useLoginStore((state) => state.token);
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
      setUser(updateUser);
    } catch (error) {
      console.log(error);
    }
  };

  const { createNotifications } = useNotificationsStore();
  const postFollow = async (id: string) => {
    // 팔로우 요청을 보내는 코드 안에 유저정보 업데이트 함수까지 실행시켜야 즉각적인 업데이트가 가능하다.
    try {
      const followed = (
        await axiosInstance.post(`follow/create`, { userId: id })
      ).data;

      createNotifications!({
        notiType: "FOLLOW",
        notiTypeId: followed._id + "",
        userId: followed.user + "",
        postId: null,
      });

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
    if (
      searchUsersData.username &&
      typeof searchUsersData.username === "string"
    ) {
      searchUsersData.username = JSON.parse(searchUsersData.username);
    }
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
        <h1 className="text-4xl font-bold">
          {`${
            searchUsers?.username
              ? typeof searchUsers?.username !== "string" &&
                searchUsers?.username?.username
              : t("유저")
          }`}
          ,{t(" 님의 프로필")}
        </h1>
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
            sx={{ cursor: "default" }}
          >
            <img
              src={searchUsers?.image ? searchUsers.image : default_profile}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                cursor: "not-allowed",
              }}
            />

            <input id="fileInput" type="file" style={{ display: "none" }} />
          </Box>
          <div className="flex flex-col items-center ">
            {/* 좌측 fullname */}
            <Typography
              sx={{
                fontSize: "48px",
                fontWeight: "bold",
              }}
            >
              {searchUsers?.fullName ? searchUsers?.fullName : "error"}
            </Typography>

            {/* 팔로우하기 */}
            {token !== null && user !== null ? (
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
                  {t("언팔로우")}
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
                  {t("팔로잉")}
                </Button>
              )
            ) : null}
          </div>
        </Stack>

        {/* 필드 */}
        <div>
          <Input
            isEditable={false}
            label="ID"
            value={searchUsers?.fullName ?? "error"} // 이거 왜 searchUsers?.fullName만 넣으면 데이터 바인딩 오류 나오지? 데이터 있는데?
          />
          <Input
            isEditable={false}
            label={t("닉네임")}
            value={
              searchUsers?.username
                ? typeof searchUsers?.username !== "string" &&
                  searchUsers?.username.username
                  ? searchUsers?.username.username
                  : "-"
                : "-"
            }
          />
          <Input
            isEditable={false}
            label="Website"
            value={
              searchUsers?.username
                ? typeof searchUsers.username !== "string"
                  ? searchUsers.username.website
                  : "-"
                : "-"
            }
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
                      backgroundColor:
                        searchUsers?.username &&
                        typeof searchUsers.username !== "string"
                          ? searchUsers.username.field.includes(
                              index.toString()
                            )
                            ? "#7EACB5"
                            : "#B0B0B0"
                          : "#B0B0B0",
                      color: "white",
                      cursor: "not-allowed",
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Stack>
        </div>
      </div>

      <SelectLanguageButton />
    </section>
  );
};

export default UserPage;
