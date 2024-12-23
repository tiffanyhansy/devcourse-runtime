import { EmojiButton } from "@joeattardi/emoji-button";
import { useEffect, useRef } from "react";
import { axiosInstance } from "../../api/axios";
import { useChatingModalStore } from "../../store/store";
import chating_send_icon from "../../asset/images/chating_send_icon.svg";

export default function ChatInput() {
  // 이모지 선택
  const emojiPicker = useRef<EmojiButton | null>(null);
  const chatRef = useRef<HTMLInputElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);

  const nowChatId = useChatingModalStore((state) => state.nowChatId);
  const isChatingOpen = useChatingModalStore((state) => state.isChatingOpen);

  const sendMessage = async (message: string, receiverId: string) => {
    try {
      await axiosInstance.post(`/messages/create`, {
        message: message,
        receiver: receiverId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    emojiPicker.current = new EmojiButton({
      recentsCount: 20,
      zIndex: 50,
      rows: 6,
    });
    emojiPicker.current.on("emoji", (emoji: any) => {
      if (chatRef.current) {
        chatRef.current.value += emoji.emoji;
      }
    });
  }, []);
  return (
    <article className="flex gap-[10px]">
      <button
        className="text-2xl cursor-pointer emoji-button"
        onClick={(e) => emojiPicker.current?.togglePicker(e.currentTarget)}
      >
        😊
      </button>
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
          if (isChatingOpen) {
            if (
              chatRef.current?.value &&
              chatRef.current?.value.trim() !== ""
            ) {
              sendMessage(chatRef.current.value.trim(), nowChatId);
              chatRef.current.value = "";
            }
          } else {
            console.log("ㄴㄴ");
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
  );
}
