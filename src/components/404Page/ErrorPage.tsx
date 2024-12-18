import { Link } from "react-router";
import runtime_logo from "../../asset/images/runtime_logo.svg";

export default function ErrorPage() {
  return (
    <>
      <main className="">
        <section className="flex w-full h-screen justify-center items-center flex-col">
          <div className="flex">
            <span className="text-9xl text-[#C96868] font-bold">4</span>
            <img
              src={runtime_logo}
              alt="Runtime Logo"
              className="w-36 h-36 mx-5"
            />
            <span className="text-9xl text-[#C96868] font-bold">4</span>
          </div>
          <div className="pt-5 text-center">
            <span className="text-base font-bold ">
              죄송합니다. 찾고 있는 콘텐츠가 존재하지 않습니다. <br />
              삭제되었거나 링크를 잘못 입력했습니다.
            </span>
          </div>
          <div className="text-center items-center mt-6">
            <Link to="/" className="text-lg">
              <button className="bg-[#C96868] w-44 h-12 text-white font-bold p-3 rounded-[7.49px]">
                홈으로 돌아가기
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
