import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import NotiMainList from "./NotiMainList";
import { useNotificationsStore } from "../../../store/notificationsStore";
import { axiosInstance } from "../../../api/axios";
import { useLoginStore } from "../../../store/API";
import noti_empty from "../../../asset/images/noti_empty.svg";
import loadingImg from "../../../asset/images/loading.svg";
import { t } from "i18next";

export default function NotiMain() {
  const { loading, list } = useNotificationsStore();
  const setUser = useLoginStore((state) => state.setUser);

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
        list!.length > 0 ? (
          list?.map((item) => <NotiMainList key={uuidv4()} {...item} />)
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
