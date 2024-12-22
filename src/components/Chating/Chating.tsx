import { useEffect, useRef, useState } from "react";
import { useChatingModalStore } from "../../store/store";
import { axiosInstance } from "../../api/axios";
import { conversationsType } from "../../api/api";
import { v4 as uuidv4 } from "uuid";
import { useLoginStore } from "../../store/API";
import chating_send_icon from "../../asset/images/chating_send_icon.svg";

export default function Chating() {
  const nowChatId = useChatingModalStore((state) => state.nowChatId);
  const [userChat, setUserChat] = useState<conversationsType[]>([]);

  const setUser = useLoginStore((state) => state.setUser);
  const user = useLoginStore((state) => state.user);

  const getAuthUser = async () => {
    const newUser = await (await axiosInstance.get(`/auth-user`)).data;
    localStorage.setItem(
      "LoginUserInfo",
      JSON.stringify(newUser === "" ? null : newUser)
    );
    setUser(newUser);
  };

  const getMessage = async () => {
    try {
      const message: conversationsType[] = (
        await axiosInstance(`/messages?userId=${nowChatId}`)
      ).data;
      setUserChat(message);
    } catch (error) {
      console.log(error);
    }
  };

  const chatRef = useRef<HTMLInputElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);

  const sendMessage = async (message: string, receiverId: string) => {
    try {
      const sending = await axiosInstance.post(`/messages/create`, {
        message: message,
        receiver: receiverId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateSeen = () => {
    try {
      axiosInstance.put(`/messages/update-seen`, { sender: nowChatId });
    } catch (error) {
      console.log(error);
    }
  };

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAuthUser();
    updateSeen();
    getMessage().then(() => {
      setTimeout(() => {
        chatBoxRef.current!.scrollTop = chatBoxRef.current!.scrollHeight;
      }, 0);
    });
    const messageInterval = setInterval(() => {
      console.log("작동중");
      getMessage();
      updateSeen();
    }, 3000);

    // return clearInterval(messageInterval)
    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    if (
      chatBoxRef.current!.scrollHeight -
        (chatBoxRef.current!.scrollTop + chatBoxRef.current!.clientHeight) <
      200
    ) {
      chatBoxRef.current!.scrollTop = chatBoxRef.current!.scrollHeight;
    }
  }, [getMessage]);

  return (
    <>
      <article className="p-5">
        <p className="text-[13px] text-gray-500 text-center bg-white mb-2">
          {userChat.length !== 0
            ? `<${
                user?._id === userChat[0].receiver._id
                  ? userChat[0].sender.fullName
                  : userChat[0].receiver.fullName
              } 님과 대화 >`
            : "<채팅을 입력해 대화를 시작해주세요!>"}
        </p>
        <article
          ref={chatBoxRef}
          className="w-full h-[400px] border pt-5 px-[20px] flex flex-col gap-[10px] mb-[10px] overflow-y-scroll custom-scroll"
        >
          {userChat.map((e) => {
            if (user?._id === e.receiver._id) {
              return (
                <article key={uuidv4()} className="w-full flex justify-start">
                  <article className="flex flex-col items-start">
                    <article className="flex gap-1 items-end">
                      <span className="text-left max-w-[200px] px-2 py-1 rounded-r-lg rounded-tl-lg bg-[#E8F0FE] relative after:contents-[*] after:absolute after:bottom-0 after:left-[-10px] after:w-0 after:h-0 after:border-l-[10px] after:border-l-transparent after:border-b-[10px] after:border-b-[#E8F0FE]">
                        {e.message}
                      </span>
                      {!e.seen && (
                        <span className="text-[10px] text-yellow-500">1</span>
                      )}
                    </article>
                    <span className="text-[10px]">{e.createdAt}</span>
                  </article>
                </article>
              );
            } else {
              return (
                <article key={uuidv4()} className="w-full flex justify-end">
                  <article className="flex flex-col items-end">
                    <article className="flex gap-1 items-end">
                      {!e.seen && (
                        <span className="text-[10px] text-yellow-500">1</span>
                      )}
                      <span className="max-w-[200px] text-right px-2 py-1 rounded-l-lg rounded-tr-lg relative bg-[#E8F0FE] after:contents-[*] after:absolute after:bottom-0 after:right-[-10px] after:w-0 after:h-0 after:border-r-[10px] after:border-r-transparent after:border-b-[10px] after:border-b-[#E8F0FE]">
                        {e.message}
                      </span>
                    </article>
                    <span className="text-[10px]">{e.createdAt}</span>
                  </article>
                </article>
              );
            }
          })}
        </article>
        <article className="flex gap-[10px]">
          <input
            type="text"
            className="w-full px-2 py-2 rounded-lg bg-[#F0F0F0] focus:outline-none"
            ref={chatRef}
            onKeyDown={(e) => e.key === "Enter" && sendBtnRef.current?.click()}
          />
          <button
            className="w-[35px] rounded-[10px]"
            ref={sendBtnRef}
            onClick={() => {
              if (
                chatRef.current?.value &&
                chatRef.current?.value.trim() !== ""
              ) {
                sendMessage(chatRef.current.value.trim(), nowChatId);
                chatRef.current.value = "";
                chatBoxRef.current!.scrollTop =
                  chatBoxRef.current!.scrollHeight;
              }
            }}
          >
            <img
              src={chating_send_icon}
              alt="채팅 전송 아이콘"
              className="w-full"
            />
          </button>
        </article>
      </article>
    </>
  );
}
