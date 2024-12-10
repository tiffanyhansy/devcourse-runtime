import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useHeaderModalStore } from "../../store/store";

export default function Modal({ y, x }: { x?: number; y?: number }) {
  const { modal, type, open, close } = useHeaderModalStore();
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      if (
        // 모달창 내부 영역이 아니면 모달창 닫게 하기
        modal &&
        contentRef.current &&
        !contentRef.current?.contains(element)
      )
        close();
    };
    // 전체 문서에 클릭 이벤트 추가하기
    document.addEventListener("click", onClick);
    // 언마운트시 클릭이벤트 삭제하기
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [contentRef]);

  return (
    <div
      ref={contentRef}
      className="absolute z-50"
      style={{
        top: x ? `${x}px` : "4.5rem",
        right: y ? `${y}px` : "50px",
      }}
    >
      <div
        className={`${
          type === "header" ? "h-52" : "h-42"
        } inline-flex flex-col items-center justify-center bg-white h-42 drop-shadow-xl rounded-2xl`}
      >
        <div className="w-[305px] px-4 pt-[18px]  rounded-tl-2xl rounded-tr-2xl justify-start items-center gap-[89px] inline-flex">
          <div className="h-[60px] pr-[68px] pb-[18px] justify-start items-center gap-3 flex">
            <div className="w-[42px] h-[42px] relative">
              <div className="w-[42px] h-[42px] left-0 top-0 absolute bg-gradient-to-b from-[#cdddfc] to-[#c9afff] rounded-full" />
              <div className="w-[42px] h-[42px] left-0 top-0 absolute">
                <div className="w-[42px] h-[42px] left-0 top-0 absolute bg-gradient-to-b from-[#fcd7b4] to-[#ffc2af] rounded-full" />
                <img
                  className="w-11 h-11 left-0 top-[-2px] absolute"
                  src="/src/asset/images/profile.svg"
                />
              </div>
            </div>
            <div className="flex-col justify-center items-start gap-[3px] inline-flex">
              <div className="justify-start items-end gap-2.5 inline-flex">
                <div className="justify-start items-center gap-[7px] flex">
                  <div className="text-black text-lg font-medium font-['Inter']">
                    Sardor
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cursor-pointer">
          <div className="w-[305px] h-[60px] px-2.5 py-1  flex-col justify-start items-start gap-2.5 flex">
            <div className="justify-start items-center gap-3.5 inline-flex">
              <div className="h-[52px] px-3.5 py-[15px] rounded-[14px] justify-center gap-3 flex">
                <div className="relative w-5 h-5">
                  <img
                    className="w-5 h-5 left-[2px] top-[2px] absolute"
                    src="/src/asset/images/settings.svg"
                  />
                </div>
                <Link
                  to="./mypage"
                  className="text-black text-lg font-medium font-['Inter']"
                  onClick={close}
                >
                  내 프로필
                </Link>
              </div>
            </div>
          </div>
        </div>
        {type === "header" && (
          <div className="cursor-pointer">
            <div className="w-[305px] h-[60px] px-2.5 py-1  flex-col justify-start items-start gap-2.5 flex">
              <div className="justify-start items-center gap-3.5 inline-flex">
                <div className="h-[52px] px-3.5 py-[15px] rounded-[14px] justify-center gap-3 flex">
                  <div className="relative w-5 h-5">
                    <img
                      className="w-5 h-5 left-[2px] top-[2px] absolute"
                      src="/src/asset/images/signout.svg"
                    />
                  </div>
                  <Link
                    to="./login"
                    className="text-black text-lg font-medium font-['Inter']"
                    onClick={close}
                  >
                    로그아웃
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
