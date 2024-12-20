import { useEffect, useRef } from "react";
import { useChatingModalStore } from "../../store/store";
import { axiosInstance } from "../../api/axios";
import { conversationsType } from "../../api/api";
import Chating from "./Chating";
import { useLoginStore } from "../../store/API";
import UserSearchModal from "./UserSearchModal";
import ChatUserList from "./ChatUserList";

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

  // 언제 사용될 지 모르는 전체 채팅로그 불러오기
  const conversations = useChatingModalStore((state) => state.conversations);
  const setConversations = useChatingModalStore(
    (state) => state.setConversations
  );

  // 중복되는 메신저 유저 분류용 배열 함수
  const setConversationUsers = useChatingModalStore(
    (state) => state.setConversationUsers
  );
  const conversationUsers = useChatingModalStore(
    (state) => state.conversationUsers
  );

  // 채팅창 오픈 트리거
  const isChatingOpen = useChatingModalStore((state) => state.isChatingOpen);

  // 유저 검색창 오픈 트리거
  const isSearchModalOpen = useChatingModalStore(
    (state) => state.isSearchModalOpen
  );

  // 컨텐츠 닫기 트리거
  const isContentClose = useChatingModalStore((state) => state.isContentClose);
  const setIsContentClose = useChatingModalStore(
    (state) => state.setIsContentClose
  );

  // 여기서는 모달창 닫을 때 추가유저 리스트 초기화용 함수로 사용용
  const setAddedUserList = useChatingModalStore(
    (state) => state.setAddedUserList
  );

  // 현재 유저 정보
  const user = useLoginStore((state) => state.user);

  // 메신저 기록 axios(메시지함은 뭘 받아오는건지 이해가 안되서 안 씀 messages?userId 이거 쓰니 사용자 id와 관련된 메시지 전부를 들고오길래 이걸로 예외처리해서 상단 메시지 기록으로 사용중)
  const getConversations = async () => {
    try {
      const getConversations: conversationsType[] = (
        await axiosInstance.get(`messages?userId=${user?._id}`)
      ).data;

      // 언젠가 쓸 지 모르는 전체채팅로그 불러오기
      setConversations(getConversations);

      // 채팅 보낸 유저들 중복없이 모아두기
      const users: string[] = [];
      const filterConversations = getConversations.filter((e) => {
        if (e.sender._id !== user?._id) {
          if (!users.includes(e.sender._id)) {
            users.push(e.sender._id);
            return true;
          }
        }
        if (e.receiver._id !== user?._id) {
          if (!users.includes(e.receiver._id)) {
            users.push(e.receiver._id);
            return true;
          }
        }
        return false;
      });
      setConversationUsers(filterConversations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <article
      className="w-[500px] rounded-t-[10px] border border-black bg-white absolute top-[100px] left-[50%] translate-x-[-50%] translate-y-[-20px] z-50"
      ref={movingRef}
    >
      {/* 최상단 검은색 바 */}
      <article
        className="w-full h-[50px] rounded-t-[10px] bg-black block relative"
        ref={targetRef}
        draggable={true}
        onDragStart={(event) => {
          dragStartHandler(event);
        }}
        onDragOver={(event) => {
          dragOverHandler(event);
        }}
      >
        <article className="flex gap-1 absolute right-[10px] top-[50%] translate-y-[-50%]">
          <button
            className="w-[20px] h-[20px] bg-white"
            onClick={() => {
              if (!isContentClose) {
                contentRef.current!.style.display = "none";
                setIsContentClose();
              } else {
                contentRef.current!.style.display = "block";
                setIsContentClose();
              }
            }}
          >
            -
          </button>
          <button
            className="w-[20px] h-[20px] bg-white"
            onClick={() => {
              setIsChatModalOpenFalse();
              setAddedUserList([]);
            }}
          >
            X
          </button>
        </article>
      </article>
      <section ref={contentRef}>
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
