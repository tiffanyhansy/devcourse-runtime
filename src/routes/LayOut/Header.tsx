import { Link, useLocation } from "react-router";
import Modal from "../../components/Modal/ProfileModal";
import { useEffect, useState } from "react";
import { useprofileModalStore } from "../../store/store";
import { axiosInstance } from "../../api/axios";
import { useLoginStore } from "../../store/API";

export default function Header() {
  const [imgState, setImgState] = useState<boolean>(true);
  const location = useLocation();
  const { modal, type, open, close } = useprofileModalStore();
  const handleOpen = () => {
    if (!modal) open("header");
    else {
      close();
    }
  };
  const user = useLoginStore((state) => state.user);
  console.log("user:", user);
  // 알림목록 받아오기기
  // 임시 api 옮길예정 , 타입 지정 예정
  const getNotificationList = async () => {
    try {
      const { data } = await axiosInstance.get("/notifications");
      console.log(data.filter((i: any) => i.seen === false).length);
      const count = data.filter((i: any) => i.seen === false).length;
      count > 0 ? setImgState(false) : setImgState(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user && getNotificationList();
  }, []);

  return (
    <header className="w-full h-[80px] fixed top-0 left-0 flex items-center justify-between bg-white z-40">
      <section className="w-[1440px] max-w-[1440px] h-full flex items-center justify-between mx-auto px-[50px] ">
        <article className="flex items-center gap-[30px]">
          <Link to="/">
            <img
              src={"/src/asset/images/runtime_logo.svg"}
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
        <article className="flex items-center gap-[30px]">
          {user && (
            <Link to="./notifications">
              {/* api 받아와서 상태변경해야함 지금은 임시처리~ */}
              <img
                src={
                  imgState
                    ? "/src/asset/images/alarm_icon.svg"
                    : "/src/asset/images/bell.svg"
                }
                alt={"알람 아이콘"}
              />
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
              src={
                user?.coverImage
                  ? user.coverImage
                  : `/src/asset/default_profile.png`
              }
              alt="유저 이미지 커버"
              className="rounded-full"
            />
          </button>
          {type === "header" && <Modal />}
        </article>
      </section>
    </header>
  );
}
