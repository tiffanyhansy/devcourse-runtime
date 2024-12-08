import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  // const navigate = useNavigate();
  return (
    <header className="w-full h-[80px] fixed justify-between flex top-0 left-0 items-center px-[50px] bg-white">
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
        <Link to="#">
          <img src={"/public/alarm_icon.svg"} alt={"알람 아이콘"} />
        </Link>
        <Link
          to="/mypage"
          className={`w-[40px] h-[40px] rounded-full bg-[url(/public/profile.svg)] bg-center`}
        ></Link>
      </article>
    </header>
  );
}
