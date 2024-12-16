import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";

type data = {
  seen: boolean;
  author: {
    fullName: string;
  };
  createdAt: string;
  follow?: {};
  like?: {
    _id: string;
    post: {
      title: string;
    };
  };
};

type notiData = {
  [key: string]: string;
};

export default function Noti() {
  const [data, setData] = useState<data[]>([]);

  // 임시 api 추후 옮길예정
  const getNotificationList = async () => {
    try {
      const { data } = await axiosInstance.get("/notifications");
      setData(data);
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotificationList();
  }, []);

  const isSeen = async (id?: string) => {
    const { data } = await axiosInstance.put("/notifications/seen", {
      id: id,
    });
    console.log(id, data);
  };

  return (
    <article className="flex w-full mt-[150px] mb-20 justify-center items-center flex-col">
      <div className="w-[800px] p-2 rounded-[20px] flex-col justify-start items-start overflow-y-hidden hover:overflow-y-auto scrollbar-gutter-stable h-[600px]">
        {/* 반복되는 알림들 */}
        {data.map((i, v) => (
          <div
            key={v}
            className={`px-2.5 h-[70px] py-2.5 justify-center items-center flex w-full cursor-pointer ${
              i.seen && "bg-gray-50"
            }`}
            onClick={() => isSeen(i.like?._id)}
          >
            <div className="flex h-[50px] gap-2.5 w-full justify-between items-center">
              {/* 이미지와 텍스트 그룹 */}
              <div className="flex items-center gap-2.5 justify-between">
                <img
                  className="w-[50px] h-[50px] rounded-[100px]"
                  src="/src/asset/default_profile.png"
                />
                <div className="text-black leading-[19px]">
                  <span className="font-extrabold">{i.author.fullName}</span>
                  {` 님이 `}
                  {/* 좋아요 or 팔로우 */}
                  {i.like && (
                    <span>
                      <span className="font-extrabold">
                        {i.like.post.title.length > 20
                          ? `${i.like.post.title.slice(0, 20)}...`
                          : i.like.post.title}
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
              {i.follow && (
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
                  onClick={() =>
                    createNotifications({
                      notiType: "LIKE",
                      notiTypeId: "675e8f3ac5e8b156f3a263ec",
                      userId: "675bd5ea82d8556fc593b5c5",
                      postId: "675d3ceff8d8ed32dcef6152",
                    })
                  }
                >
                  팔로잉
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
