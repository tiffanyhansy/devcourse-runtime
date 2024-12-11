import { Link } from "react-router-dom";
import Modal from "../../components/headerModal/Modal";
import { useState } from "react";
import { useHeaderModalStore } from "../../store/store";

export default function Header() {
  const modal = useHeaderModalStore((s) => s.modal);
  const type = useHeaderModalStore((s) => s.type);
  const open = useHeaderModalStore((s) => s.open);

  const handleOpen = () => open("header");
  const [imgState, setImgState] = useState("/src/asset/images/bell.svg");

  return (
    <header className="w-full h-[80px] fixed justify-between flex top-0 left-0 items-center px-[50px] bg-white z-40">
      <article className="flex items-center gap-[30px]">
        <Link to="#">
          <img
            src={"/src/asset/images/runtime_logo.svg"}
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
            onClick={() => setImgState("/src/asset/images/bellalarm_icon.svg")}
          />
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className={`w-[40px] h-[40px] rounded-full bg-[url(/src/asset/images/profile.svg)] bg-center`}
        ></button>
        {modal && type === "header" && <Modal />}
      </article>
    </header>
  );
}
