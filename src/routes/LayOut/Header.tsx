import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useprofileModalStore } from "../../store/store";
import { useLoginStore } from "../../store/API";
import { useNotificationsStore } from "../../store/notificationsStore";
import Modal from "../../components/Modal/ProfileModal";
import runtime from "../../asset/images/runtime_logo.svg";
import bell from "../../asset/images/bell.svg";
import default_bell from "../../asset/images/alarm_icon.svg";
import default_profile from "../../asset/default_profile.png";

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

  return (
    <header className="w-full h-[80px] fixed top-0 left-0 flex items-center justify-between bg-white z-40">
      <section className="w-[1440px] max-w-[1440px] h-full flex items-center justify-between mx-auto px-[50px] ">
        <article className="flex items-center gap-[30px]">
          <Link to="/">
            <img
              src={runtime}
              alt={"런타임 로고"}
              className="w-[40px] h-[40px] object-cover"
            />
          </Link>
          <Link
            to="/"
            className={`text-lg ${
              location.pathname === "/" ? "font-bold" : ""
            }`}
          >
            홈
          </Link>
          <Link
            to="/community"
            className={`text-lg ${
              location.pathname === "/community" ? "font-bold" : ""
            }`}
          >
            게시글
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
              src={user?.image ? user.image : `/src/asset/default_profile.png`}
              alt="유저 이미지 커버"
              className="rounded-full w-full h-full object-cover"
            />
          </button>
          {type === "header" && <Modal />}
        </article>
      </section>
    </header>
  );
}
