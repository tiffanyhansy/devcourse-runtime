import { Link } from "react-router";
import mascot_nobg from "../../asset/images/mascot_nobg.svg";

export default function ErrorPage() {
  return (
    <>
      <main className="">
        <section className="flex flex-col items-center justify-center w-full h-screen">
          <div className="flex">
            <span className="text-9xl text-[#C96868] font-bold">4</span>
            <img
              src={mascot_nobg}
              alt="Runtime Logo"
              className="mx-4 w-36 h-36"
            />
            <span className="text-9xl text-[#C96868] font-bold">4</span>
          </div>
          <div className="pt-5 text-center">
            <span className="text-base font-bold ">
              죄송합니다. 찾고 있는 콘텐츠가 존재하지 않습니다. <br />
              삭제되었거나 링크를 잘못 입력했습니다.
            </span>
          </div>
          <div className="items-center mt-6 text-center">
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
