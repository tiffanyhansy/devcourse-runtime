import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";
import Buttons from "../../components/common/SquareButton";
import { useLoginStore } from "../../store/API";
import { followType } from "../../api/api";

type data = {
  seen: boolean;
  author: {
    coverImage?: string;
    fullName: string;
    _id: string;
  };
  createdAt: string;
  follow?: {
    user: string;
    _id: string;
  };
  like?: {
    _id: string;
    post: {
      title: string;
    };
  };
  user: {
    coverImage?: string;
    _id: string;
    following: string[];
  };
};

type notiData = {
  notiType: string;
  notiTypeId: string;
  userId: string;
  postId: null;
};

export default function Noti() {
  const [data, setData] = useState<data[]>([]);
  const [active, setActive] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useLoginStore((state) => state.user);
  const setUser = useLoginStore((state) => state.setUser);

  const isActive = () => {
    setActive(() => !active);
  };

  // 임시 api 추후 옮길예정

  // 모두 읽음 처리하기
  const isSeen = async () => {
    try {
      const { data } = await axiosInstance.put("/notifications/seen");
      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  // 알림목록 받아오기기
  const getNotificationList = async () => {
    try {
      const { data } = await axiosInstance.get("/notifications");
      setData(data);
      setLoading(true);
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  // 안읽은 리스트 보기기
  const isNseenList = () => {
    setData(() => data.filter((data) => data.seen === false));
    console.log(data.filter((data) => data.seen === false));
  };

  // 전체 리스트 보기기
  const isYseenList = () => {
    getNotificationList();
  };

  // title 받아오기
  const getTitle = (title: string): string => {
    try {
      const parsed = JSON.parse(title);
      return parsed.title.length > 20
        ? parsed.title.slice(0, 20) + "..."
        : parsed.title;
    } catch (error) {
      console.error(title, "JSON 파싱 실패:", error);
      return "Invalid title";
    }
  };

  // 알림 생성하기기
  const createNotifications = async ({
    notiType,
    notiTypeId,
    userId,
    postId,
  }: notiData) => {
    try {
      const { data } = await axiosInstance.post("/notifications/create", {
        notificationType: notiType, //LIKE , FOLLOW
        notificationTypeId: notiTypeId, // LIKE = LIKE id , FOLLOW = FOLLOW id
        userId: userId, // 알림 받을 user id
        postId: postId, // 좋아요 받은 post id , FOLLOW 는 null
      });
      console.log("createNotifications", data);
    } catch (error) {
      console.log(error);
    }
  };

  // 팔로우 하기
  const postFollow = async (id: string) => {
    try {
      const followed = (
        await axiosInstance.post(`follow/create`, { userId: id })
      ).data;

      createNotifications({
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

  // 언팔로우 하기
  const deleteUnFollow = async (id: string) => {
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

  // 로그인 사용자 상태 조회
  const getAuthUser = async () => {
    const newUser = await (await axiosInstance.get(`/auth-user`)).data;
    localStorage.setItem("LoginUserInfo", JSON.stringify(newUser));
    setUser(newUser);
  };

  useEffect(() => {
    getNotificationList();
    setUpdate(false);
  }, [update]);

  useEffect(() => {
    getNotificationList();
    getAuthUser();
  }, []);

  return (
    <article className="flex w-full mt-[150px] mb-20 justify-center items-center flex-col">
      <div className="flex w-4/6 justify-between">
        <div className="flex gap-2 mb-4">
          <Buttons
            variant="primary"
            size="xs"
            textSize="sm"
            className="font-normal hover:bg-[#96ccd6]"
            style={{
              backgroundColor: active === true ? "#7EACB5" : "#e5e7eb", // 선택된 채널 색상 변경
            }}
            onClick={() => {
              isActive();
              isYseenList();
            }}
          >
            전체
          </Buttons>
          <Buttons
            variant="primary"
            size="xs"
            textSize="sm"
            className="font-normal hover:bg-[#96ccd6]"
            style={{
              backgroundColor: active === false ? "#7EACB5" : "#e5e7eb", // 선택된 채널 색상 변경
            }}
            onClick={() => {
              isActive();
              isNseenList();
            }}
          >
            읽지 않음
          </Buttons>
        </div>
        <span className="cursor-pointer" onClick={() => isSeen()}>
          모두 읽음
        </span>
      </div>
      <div className="w-4/6 p-2 rounded-[20px] flex-col justify-start items-start overflow-auto scrollbar-hidden h-[500px]">
        {/* 반복되는 알림들 */}
        {loading ? (
          data.length > 0 ? (
            data.map((i, v) => (
              <div
                key={v}
                className={`px-2.5 h-[70px] py-2.5 justify-center items-center flex w-full cursor-pointer text-black ${
                  i.seen && "bg-gray-50 text-gray-500"
                }`}
              >
                <div className="flex h-[50px] gap-2.5 w-full justify-between items-center">
                  {/* 이미지와 텍스트 그룹 */}
                  <div className="flex items-center gap-2.5 justify-between">
                    <img
                      className="w-[50px] h-[50px] rounded-[100px]"
                      src={`${
                        i.author.coverImage
                          ? i.author.coverImage
                          : "/src/asset/default_profile.png"
                      }`}
                    />
                    <div className=" leading-[19px]">
                      <span className="font-extrabold">
                        {i.author.fullName}
                      </span>
                      {` 님이 `}
                      {/* 좋아요 or 팔로우 */}
                      {i.like && (
                        <span>
                          <span className="font-extrabold">
                            {getTitle(i.like.post.title)}
                          </span>
                          {` 포스트를 좋아 합니다. `}
                        </span>
                      )}
                      {i.follow && ` 회원님을 팔로우 하였습니다. `}
                      {/* 시간 */}
                      <span className="text-gray-400 text-[11px]">{`${new Date(
                        i.createdAt
                      ).getFullYear()}년 ${
                        new Date(i.createdAt).getMonth() + 1
                      }월 ${new Date(i.createdAt).getDate()}일 `}</span>
                    </div>
                  </div>
                  {i.follow &&
                    user?.following &&
                    (user.following.find(
                      (e: followType) => e.user === i.author._id
                    ) ? (
                      <Button
                        variant="contained"
                        sx={{
                          color: "black",
                          backgroundColor: "white",
                          fontWeight: "bold",
                          border: "1px solid black",
                          width: "118px",
                          height: "35px",
                          "::after": {
                            content: '"언팔로우"',
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#C96868",
                            opacity: 0,
                            transition: "none",
                          },
                          "&:hover": {
                            transition: "none",
                            border: "1px solid #C96868",
                            color: "transparent",
                            "::after": {
                              opacity: 1,
                            },
                          },
                        }}
                        onClick={() => {
                          deleteUnFollow(
                            user.following.find(
                              (e: followType) => e.user === i.author._id
                            )!._id
                          );
                        }}
                      >
                        팔로잉
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "white",
                          fontWeight: "bold",
                          border: "1px solid #7eacb5",
                          width: "118px",
                          height: "35px",
                          color: "#7eacb5",
                        }}
                        onClick={() => postFollow(i.author._id)}
                      >
                        팔로우
                      </Button>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <img
                src="/src/asset/images/noti_empty.svg"
                className="h-[450px]"
              />
              <span className="text-2xl">새로운 알림이 없습니다.</span>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center">
            <img src="/src/asset/images/loading.svg" className="h-[100px]" />
          </div>
        )}
      </div>
    </article>
  );
}
