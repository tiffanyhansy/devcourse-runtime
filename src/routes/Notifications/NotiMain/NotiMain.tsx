import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import NotiMainList from "./NotiMainList";
import { t } from "i18next";
import { useNotificationsStore } from "../../../store/notificationsStore";
import { axiosInstance } from "../../../api/axios";
import { useLoginStore } from "../../../store/API";
import noti_empty from "../../../asset/images/noti_empty.svg";
import loadingImg from "../../../asset/images/loading.svg";

export default function NotiMain() {
  const { loading, list, likeStates } = useNotificationsStore();
  const setUser = useLoginStore((state) => state.setUser);

  const reverseList = [...list!].reverse();
  // 좋아요 중복 데이터 제거를 위한 처리
  // 1. 좋아요 중복 제거 데이터 + 기존 데이터
  // 2. 최신순으로 정렬
  const uniqueData = [
    ...Array.from(
      new Map(
        reverseList
          ?.filter((item) => item.like?.post.title)
          .map((item) => [item.like?.post.title, item])
      ).values()
    ),
    ...(list?.filter((item) => !item.like?.post.title) || []),
  ].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const likedItems = Object.entries(likeStates!)
    .filter(([_, value]) => value.isLiked === true)
    .map(([key, value]) => ({ key, ...value }));

  const filteredData = uniqueData.filter((item) => {
    // likedItems의 key 값이 uniqueData의 id나 postId와 일치하지 않으면 포함
    return !likedItems.some(
      (likedItem) =>
        likedItem.userId === item.author._id && likedItem.key === item.post
    );
  });

  // 로그인 사용자 상태 조회
  const getAuthUser = async () => {
    const newUser = await (await axiosInstance.get(`/auth-user`)).data;
    localStorage.setItem("LoginUserInfo", JSON.stringify(newUser));
    setUser(newUser);
  };

  // 즉각적인 유저정보 반영을 위한 처리
  useEffect(() => {
    getAuthUser();
  }, []);

  return (
    <div className="w-4/6 p-2 rounded-[20px] flex-col justify-start items-start overflow-auto scrollbar-hidden h-[500px]">
      {loading ? (
        filteredData!.length > 0 ? (
          filteredData?.map((item) => <NotiMainList key={uuidv4()} {...item} />)
        ) : (
          <div className="flex flex-col items-center">
            <img src={noti_empty} className="h-[450px]" />
            <span className="text-2xl">{t("새로운 알림이 없습니다.")}</span>
          </div>
        )
      ) : (
        // 로딩 페이지
        <div className="flex items-center justify-center">
          <img src={loadingImg} className="h-[100px]" />
        </div>
      )}
    </div>
  );
}
