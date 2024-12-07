import { Link } from "react-router-dom";
import Modal from "../../components/headerModal/Modal";
import { useState } from "react";
import { useHeaderModalStore } from "../../store/store";

export default function Header() {
  const open = useHeaderModalStore((s) => s.open);
  const modalState = useHeaderModalStore((s) => s.modal);
  const [imgState, setImgState] = useState("/public/bell.svg");

  return (
    <header className="w-full h-[80px] fixed justify-between flex top-0 left-0 items-center px-[50px] bg-white z-40">
      <article className="flex items-center gap-[30px]">
        <Link to="#">
          <img
            src={"/public/runtime_logo.svg"}
            alt={"런타임 로고"}
            className="w-[40px] h-[40px] object-cover"
          />
        </Link>
        <Link to="/" className="text-lg">
          홈
        </Link>
        <Link to="#" className="text-lg">
          게시글
        </Link>
      </article>
      <article className="flex items-center gap-[30px]">
        <Link to="./notifications">
          {/* api 받아와서 상태변경해야함 지금은 임시처리~ */}
          <img
            src={imgState}
            alt={"알람 아이콘"}
            onClick={() => setImgState("/public/alarm_icon.svg")}
          />
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          className={`w-[40px] h-[40px] rounded-full bg-[url(/public/profile.svg)] bg-center`}
        ></button>
        {modalState && <Modal />}
      </article>
    </header>
  );
}
