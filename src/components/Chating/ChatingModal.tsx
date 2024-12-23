import { useEffect, useRef } from "react";
import { useChatingModalStore } from "../../store/store";
import Chating from "./Chating";
import UserSearchModal from "./UserSearchModal";
import ChatUserList from "./ChatUserList";
import close_to_bar from "../../asset/images/close_to_bar.svg";
import open_in_full from "../../asset/images/open_in_full.svg";
import close from "../../asset/images/close.svg";

export default function ChatingModal() {
  const setIsChatModalOpenFalse = useChatingModalStore(
    (state) => state.setIsChatModalOpenFalse
  );

  // 모달창 이동기능
  const movingRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const dragStartHandler = (e: React.DragEvent<HTMLElement>) => {
    if (e.target === targetRef.current) {
      const img = new Image();
      img.src = "";
      e.dataTransfer.setDragImage(img, 0, 0);
      movingRef.current!.style.top = `${e.clientY}px`;
      movingRef.current!.style.left = `${e.clientX}px`;
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    if (e.target === targetRef.current) {
      e.preventDefault();
      movingRef.current!.style.top = `${e.clientY}px`;
      movingRef.current!.style.left = `${e.clientX}px`;
    }
  };

  // 채팅창 트리거
  const isChatingOpen = useChatingModalStore((state) => state.isChatingOpen);

  // 유저 검색창 오픈 트리거
  const isSearchModalOpen = useChatingModalStore(
    (state) => state.isSearchModalOpen
  );

  // 컨텐츠 닫기 트리거
  const isContentClose = useChatingModalStore((state) => state.isContentClose);
  const setIsContentCloseTrue = useChatingModalStore(
    (state) => state.setIsContentCloseTrue
  );
  const setIsContentCloseFalse = useChatingModalStore(
    (state) => state.setIsContentCloseFalse
  );

  return (
    <article
      className="animate-chatSwashIn w-[500px] rounded-[10px] shadow-lg bg-white absolute top-[100px] left-[50%] translate-x-[-50%] translate-y-[-20px] z-50"
      ref={movingRef}
      style={isContentClose ? { width: "200px" } : {}}
    >
      {/* 최상단 검은색 바 */}
      <article
        className="w-full h-[40px] rounded-t-[10px] bg-[#7EACB5] block relative"
        ref={targetRef}
        draggable={true}
        onDragStart={(event) => {
          dragStartHandler(event);
        }}
        onDragOver={(event) => {
          dragOverHandler(event);
        }}
        style={isContentClose ? { borderRadius: "10px" } : {}}
      >
        <article className="flex gap-[8px] absolute right-[10px] top-[50%] translate-y-[-50%]">
          <button
            className={`w-[24px] h-[24px]`}
            onClick={() => {
              if (!isContentClose) {
                contentRef.current!.style.display = "none";
                setIsContentCloseTrue();
              } else {
                contentRef.current!.style.display = "block";
                setIsContentCloseFalse();
              }
            }}
          >
            {isContentClose ? (
              <img src={open_in_full} alt="확대 아이콘" />
            ) : (
              <img src={close_to_bar} alt="최소화 아이콘" />
            )}
          </button>
          <button
            className="w-[24px] h-[24px]"
            onClick={() => {
              isContentClose && setIsContentCloseFalse();
              setIsChatModalOpenFalse();
            }}
          >
            <img src={close} alt="채팅 모달 닫기 아이콘" />
          </button>
        </article>
      </article>
      <section
        ref={contentRef}
        className={`${isContentClose ? "hidden" : "block"}`}
      >
        <ChatUserList />

        {isChatingOpen ? (
          <Chating />
        ) : (
          <article className="p-5">
            <article className="w-full h-[440px] border p-3 mb-[10px] flex items-center justify-center"></article>
          </article>
        )}
        {isSearchModalOpen && <UserSearchModal />}
      </section>
    </article>
  );
}
