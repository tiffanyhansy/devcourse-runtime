import { create } from "zustand";
import {
  createNotiType,
  notificationsStore,
  notificationsType,
} from "../api/api";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../api/axios";

export const useNotificationsStore = create<notificationsStore>()(
  persist(
    (set, get) => ({
      imgState: true,
      loading: false,
      list: [],
      update: false,
      listLength: 0,
      likeStates: {},

      // 좋아요 상태 업데이트
      updateLikeState: (userId, id, isLiked, myId) =>
        set((state) => ({
          likeStates: {
            ...state.likeStates,
            [id]: { isLiked, userId, myId },
          },
        })),

      // 알림 업데이트
      seenUpdate: (i: boolean) => set(() => ({ update: i })),

      // 알림 리스트 가져오기
      getNotificationList: async () => {
        try {
          const { data } = await axiosInstance.get("/notifications");
          const filterData = data.filter(
            (i: notificationsType) => i.follow !== null
          );
          const noneSeen = data.filter(
            (i: notificationsType) => !i.seen && i.follow !== null
          );
          set({
            listLength: noneSeen.length,
            list: filterData,
            loading: true,
          });
        } catch (error) {
          console.log(error);
        }
      },

      // 알림 확인
      isSeen: async () => {
        try {
          await axiosInstance.put("/notifications/seen");
          get().seenUpdate!(false);
        } catch (error) {
          console.log(error);
        }
      },

      // 알림 생성
      createNotifications: async ({
        notiType,
        notiTypeId,
        userId,
        postId,
      }: createNotiType) => {
        try {
          const data = await axiosInstance.post("/notifications/create", {
            notificationType: notiType, //LIKE , FOLLOW
            notificationTypeId: notiTypeId, // LIKE = LIKE id , FOLLOW = FOLLOW id
            userId: userId, // 알림 받을 user id
            postId: postId, // 좋아요 받은 post id , FOLLOW 는 null
          });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },

      // 읽지 않은 알림 필터링
      isNseenList: () =>
        set((state) => ({
          list: state.list!.filter((item) => item.seen === false),
        })),
    }),
    {
      name: "noti-store",
      partialize: (state) => ({
        likeStates: state.likeStates,
      }),
    }
  )
);
