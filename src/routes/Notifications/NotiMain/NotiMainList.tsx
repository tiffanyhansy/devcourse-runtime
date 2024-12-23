import { Button } from "@mui/material";
import { notificationsType, followType } from "../../../api/api";
import { axiosInstance } from "../../../api/axios";
import { useLoginStore } from "../../../store/API";
import { useNotificationsStore } from "../../../store/notificationsStore";
import { t } from "i18next";
import default_profile from "../../../asset/default_profile.png";

export default function NotiMainList(list: notificationsType) {
  const { createNotifications } = useNotificationsStore();
  const user = useLoginStore((state) => state.user);
  const setUser = useLoginStore((state) => state.setUser);
  const filterUser = user?.following.find(
    (e: followType) => e.user === list.author._id
  );

  // title parse 및 말줄임 처리
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

  // 팔로우 하기
  const postFollow = async (id: string) => {
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

  return (
    <div
      className={`flex justify-between items-center p-2.5 h-[70px] w-full cursor-pointer text-black ${
        list.seen && "bg-gray-50 text-gray-500"
      }`}
    >
      <div className="flex items-center gap-2.5 justify-between">
        {/* 프로필 사진 */}
        <img
          className="w-[50px] h-[50px] rounded-[100px] object-cover"
          src={`${list.author.image ? list.author.image : default_profile}`}
        />
        <div className=" leading-[19px]">
          <span className="font-extrabold">{list.author.fullName}</span>
          {t(" 님이 ")}

          {/* 좋아요 or 팔로우 */}
          {list.like && (
            <span>
              <span className="font-extrabold">
                {getTitle(list.like.post.title)}
              </span>
              {t(" 포스트를 좋아합니다. ")}
            </span>
          )}
          {list.follow && t(" 회원님을 팔로우 하였습니다. ")}

          {list.comment && (
            <span>
              <span className="font-extrabold">
                {getTitle(list.comment.post.title)}
              </span>
              {t("포스트에 댓글을 남겼습니다.")}
            </span>
          )}
          {/* 시간 */}
          <span className="text-gray-400 text-[11px]">
            {`${new Date(list.createdAt).getFullYear()}${t("년")} ${
              new Date(list.createdAt).getMonth() + 1
            }${t("월")} ${new Date(list.createdAt).getDate()}${t("일")}`}
          </span>
        </div>
      </div>

      {/* 버튼 */}
      {list.follow &&
        user?.following &&
        (filterUser ? (
          <Button
            variant="contained"
            sx={{
              color: "#C96868",
              backgroundColor: "white",
              fontWeight: "bold",
              border: "1px solid #C96868",
              width: "118px",
              height: "35px",
            }}
            onClick={() => {
              deleteUnFollow(
                user.following.find(
                  (e: followType) => e.user === list.author._id
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
              backgroundColor: "white",
              fontWeight: "bold",
              border: "1px solid #7eacb5",
              width: "118px",
              height: "35px",
              color: "#7eacb5",
            }}
            onClick={() => postFollow(list.author._id)}
          >
            {t("팔로우")}
          </Button>
        ))}
    </div>
  );
}
