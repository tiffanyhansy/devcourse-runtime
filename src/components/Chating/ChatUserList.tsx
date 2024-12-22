import { useEffect } from "react";
import default_profile from "../../asset/default_profile.png";
import small_icon from "../../asset/images/small_icon.svg";
import { useChatingModalStore } from "../../store/store";
import { v4 as uuidv4 } from "uuid";
import { useLoginStore } from "../../store/API";
import { axiosInstance } from "../../api/axios";
import { conversationsType } from "../../api/api";
import new_chat_add_icon from "../../asset/images/new_chat_add_icon.svg";

export default function ChatUserList() {
  const conversationUsers = useChatingModalStore(
    (state) => state.conversationUsers
  );
  // 특정유저 ID 저장하기(채팅UI열때 특정 사용자 채팅 axios할때 사용)
  const setNowChatId = useChatingModalStore((store) => store.setNowChatId);

  // 현재 유저 정보
  const user = useLoginStore((state) => state.user);

  // 채팅 UI 여닫기
  const setIsChatingOpenTrue = useChatingModalStore(
    (state) => state.setIsChatingOpenTrue
  );
  const setIsChatingOpenFalse = useChatingModalStore(
    (state) => state.setIsChatingOpenFalse
  );

  // 유저검색 트리거 함수
  const isSearchModalOpen = useChatingModalStore(
    (state) => state.isSearchModalOpen
  );
  const setIsSearchModalOpenTrue = useChatingModalStore(
    (state) => state.setIsSearchModalOpenTrue
  );
  const setIsSearchModalOpenFalse = useChatingModalStore(
    (state) => state.setIsSearchModalOpenFalse
  );

  const setConversations = useChatingModalStore(
    (state) => state.setConversations
  );
  const setConversationUsers = useChatingModalStore(
    (state) => state.setConversationUsers
  );

  // 마지막 채팅 기록 불러오기
  const lastChatList = useChatingModalStore((state) => state.lastChatList);
  const setLastChatList = useChatingModalStore(
    (state) => state.setLastChatList
  );

  const getConversations = async () => {
    try {
      const getConversations: conversationsType[] = (
        await axiosInstance.get(`messages?userId=${user?._id}`)
      ).data;

      // 언젠가 쓸 지 모르는 전체채팅로그 불러오기
      setConversations(getConversations);

      // 마지막 댓글을 확인하기 위해 배열 뒤집기 사용용
      const reversedConversations = getConversations.reverse();
      // 채팅 보낸 유저들 중복없이 모아두기
      const users: string[] = [];
      const chat: conversationsType[] = [];
      const filterConversations = reversedConversations.filter((e) => {
        if (e.sender._id !== user?._id) {
          if (!users.includes(e.sender._id)) {
            users.push(e.sender._id);
            chat.push(e);
            return true;
          }
        }
        if (e.receiver._id !== user?._id) {
          if (!users.includes(e.receiver._id)) {
            users.push(e.receiver._id);
            chat.push(e);
            return true;
          }
        }
        return false;
      });
      setConversationUsers(filterConversations);
      setLastChatList(chat);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversations();
    const conversationInterval = setInterval(() => {
      getConversations();
    }, 3000);

    return () => clearInterval(conversationInterval);
  }, []);

  return (
    <article className="w-full overflow-x-scroll custom-scroll-x">
      <article className="flex flex-nowrap gap-3 pl-3 py-2">
        <button
          key={uuidv4()}
          className="flex flex-col flex-shrink-0 justify-center items-center cursor-pointer"
        >
          <img
            src={new_chat_add_icon}
            alt={"새 채팅 아이콘"}
            className="w-[50px] h-[50px] object-cover rounded-full border mb-1"
            onClick={() =>
              isSearchModalOpen
                ? setIsSearchModalOpenFalse()
                : setIsSearchModalOpenTrue()
            }
          />
          <span className="text-[13px] font-bold">{"새 채팅"}</span>
        </button>
        {conversationUsers.map((divide, idx) => {
          return (
            <article
              key={uuidv4()}
              className="relative flex flex-col flex-shrink-0 justify-center items-center cursor-pointer"
              onClick={() => {
                setNowChatId(
                  divide.sender._id !== user?._id
                    ? divide.sender._id
                    : divide.receiver._id
                );
                setIsChatingOpenFalse();
                setTimeout(() => {
                  setIsChatingOpenTrue();
                });
              }}
            >
              <img
                src={
                  divide.sender._id !== user?._id
                    ? divide.sender.image || default_profile
                    : divide.receiver.image || default_profile
                }
                alt={"전송자 이미지"}
                className="w-[50px] h-[50px] object-cover rounded-full mb-1"
                style={
                  lastChatList[idx].sender._id !== user?._id &&
                  !lastChatList[idx].seen
                    ? {
                        borderRadius: "50%",
                        backgroundImage:
                          "linear-gradient(to right, #ff0000, #ff7f50), linear-gradient(to right, #fff, #fff)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        padding: "3px",
                        width: "53px",
                        height: "53px",
                      }
                    : {}
                }
              />
              <span className="text-[13px] font-bold">
                {divide.sender._id !== user?._id
                  ? divide.sender.fullName
                  : divide.receiver.fullName}
              </span>
              {divide.sender._id !== user?._id
                ? divide.sender.isOnline && (
                    <article className="w-[10px] h-[10px] rounded-full block bg-green-500 absolute top-[40px] left-[40px]"></article>
                  )
                : divide.receiver.isOnline && (
                    <article className="w-[10px] h-[10px] rounded-full block bg-green-500 absolute top-[40px] left-[40px]"></article>
                  )}
            </article>
          );
        })}
      </article>
    </article>
  );
}
