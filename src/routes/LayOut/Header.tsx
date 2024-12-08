import Modal from "../../components/headerModal/Modal";
import { useHeaderModalStore } from "../../store/headerModalStore";

export default function Header() {
  const open = useHeaderModalStore((s) => s.open);
  const modalState = useHeaderModalStore((s) => s.modal);

  return (
    <header className="w-full h-[80px] fixed justify-between flex top-0 left-0 items-center px-[50px] bg-white z-40">
      <article className="flex items-center gap-[30px]">
        <a href="#">
          <img
            src={"/public/runtime_logo.svg"}
            alt={"런타임 로고"}
            className="w-[40px] h-[40px] object-cover"
          />
        </a>
        <a href="#" className="text-lg">
          홈
        </a>
        <a href="#" className="text-lg">
          게시글
        </a>
      </article>
      <article className="flex items-center gap-[30px]">
        <a href="#">
          <img src={"/public/alarm_icon.svg"} alt={"알람 아이콘"} />
        </a>
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
