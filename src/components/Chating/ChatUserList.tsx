import { useEffect } from "react";
import default_profile from "../../asset/default_profile.png";
import small_icon from "../../asset/images/small_icon.svg";
import { useChatingModalStore } from "../../store/store";
import { v4 as uuidv4 } from "uuid";
import { useLoginStore } from "../../store/API";
import { axiosInstance } from "../../api/axios";
import { conversationsType } from "../../api/api";

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
  const setIsSearchModalOpenTrue = useChatingModalStore(
    (state) => state.setIsSearchModalOpenTrue
  );

  const setConversations = useChatingModalStore(
    (state) => state.setConversations
  );

  const setConversationUsers = useChatingModalStore(
    (state) => state.setConversationUsers
  );

  // 전체유저목록에서 추가시키는 유저리스트
  const addedUserList = useChatingModalStore((state) => state.addedUserList);

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
    <article className="w-full overflow-x-scroll custom-scroll-x pr-[100px]">
      <article className="flex flex-nowrap gap-3 px-2 py-2 ">
        <button
          key={uuidv4()}
          className="flex flex-col flex-shrink-0 justify-center items-center cursor-pointer"
        >
          <img
            src={small_icon}
            alt={"추가가 아이콘콘"}
            className="w-[50px] h-[50px] object-cover rounded-full border mb-1"
            onClick={setIsSearchModalOpenTrue}
          />
          <span className="text-[13px] font-bold text-green-300">{"추가"}</span>
        </button>
        {addedUserList?.map((addUser) => {
          return (
            <article
              key={uuidv4()}
              className="relative flex flex-col flex-shrink-0 justify-center items-center cursor-pointer"
              onClick={() => {
                setIsChatingOpenFalse();
                setTimeout(() => {
                  setIsChatingOpenTrue();
                });
              }}
            >
              <img
                src={addUser.image ? addUser.image : default_profile}
                alt={"전송자 이미지"}
                className="w-[50px] h-[50px] object-cover rounded-full mb-1"
              />
              <span className="text-[13px] font-bold">{addUser.fullName}</span>
              {addUser.isOnline && (
                <article className="w-[10px] h-[10px] rounded-full bg-green-500 absolute top-0 left-0"></article>
              )}
            </article>
          );
        })}
        {conversationUsers.map((divide) => {
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
