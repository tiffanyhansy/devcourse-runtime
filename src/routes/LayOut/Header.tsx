import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useprofileModalStore } from "../../store/store";
import { useLoginStore } from "../../store/API";
import { useNotificationsStore } from "../../store/notificationsStore";
import Modal from "../../components/Modal/ProfileModal";
import mascot_nobg from "../../asset/images/mascot_nobg.svg";
import bell from "../../asset/images/bell.svg";
import default_bell from "../../asset/images/alarm_icon.svg";
import default_profile from "../../asset/default_profile.png";
import { useTranslation } from "react-i18next";

export default function Header() {
  const location = useLocation();
  const { modal, type, open, close } = useprofileModalStore();
  const { getNotificationList, update, seenUpdate } = useNotificationsStore();

  const handleOpen = () => {
    if (!modal) open("header");
    else {
      close();
    }
  };

  const user = useLoginStore((state) => state.user);

  // 알림이 있는경우 상태표시하기
  useEffect(() => {
    if (!user) return;
    getNotificationList!();
    const currentListLength = useNotificationsStore.getState().listLength;
    currentListLength! > 0 ? seenUpdate!(true) : seenUpdate!(false);
  }, [user, getNotificationList]);

  const { t } = useTranslation();

  return (
    <header className="w-full h-[80px] fixed top-0 left-0 flex items-center justify-between bg-white z-40">
      <section className="w-[1440px] max-w-[1440px] h-full flex items-center justify-between mx-auto px-[50px] ">
        <article className="flex items-center gap-[30px]">
          <Link to="/">
            <img
              src={mascot_nobg}
              alt={"mascot"}
              className="object-cover w-12 h-12"
            />
          </Link>
          <Link
            to="/"
            className={`text-lg ${
              location.pathname === "/" ? "font-bold" : ""
            }`}
          >
            {t("홈")}
          </Link>
          <Link
            to="/community"
            className={`text-lg ${
              location.pathname === "/community" ? "font-bold" : ""
            }`}
          >
            {t("게시판")}
          </Link>
        </article>

        <article className="relative flex items-center gap-[30px]">
          {user && (
            <Link to="./notifications">
              <img src={update ? bell : default_bell} alt={"알람 아이콘"} />
            </Link>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            className={`w-[40px] h-[40px] rounded-full bg-center`}
          >
            <img
              src={user?.image ? user.image : default_profile}
              alt="유저 이미지 커버"
              className="object-cover w-full h-full border-2 border-gray-300 rounded-full"
            />
          </button>
          {type === "header" && <Modal />}
        </article>
      </section>
    </header>
  );
}
