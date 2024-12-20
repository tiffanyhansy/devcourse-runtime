import { create } from "zustand";
import {
  createNotiType,
  notificationsStore,
  notificationsType,
} from "../api/api";
import { axiosInstance } from "../api/axios";

export const useNotificationsStore = create<notificationsStore>((set, get) => ({
  imgState: true,
  loading: false,
  list: [],
  update: false,
  listLength: 0,
  seenUpdate: (i: boolean) => set(() => ({ update: i })),
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
  isSeen: async () => {
    try {
      await axiosInstance.put("/notifications/seen");
      get().seenUpdate!(false);
    } catch (error) {
      console.log(error);
    }
  },
  createNotifications: async ({
    notiType,
    notiTypeId,
    userId,
    postId,
  }: createNotiType) => {
    try {
      await axiosInstance.post("/notifications/create", {
        notificationType: notiType, //LIKE , FOLLOW
        notificationTypeId: notiTypeId, // LIKE = LIKE id , FOLLOW = FOLLOW id
        userId: userId, // 알림받을 user id
        postId: postId, // 좋아요 받은 post id , FOLLOW 는 null
      });
    } catch (error) {
      console.log(error);
    }
  },
  isNseenList: () =>
    set((state) => ({
      list: state.list!.filter((item) => item.seen === false),
    })),
}));
