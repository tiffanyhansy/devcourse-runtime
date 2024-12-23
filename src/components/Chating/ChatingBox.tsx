import { useRef } from "react";
import { conversationsType } from "../../api/api";
import { useLoginStore } from "../../store/API";
import { v4 as uuidv4 } from "uuid";

export default function ChatingBox({
  userChat,
}: {
  userChat: conversationsType[];
}) {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const user = useLoginStore((state) => state.user);

  return (
    <article
      ref={chatBoxRef}
      className="w-full h-[400px] border pt-5 px-[20px] flex flex-col gap-[10px] mb-[10px] overflow-y-scroll custom-scroll"
    >
      {userChat.map((e) => {
        if (user?._id === e.receiver._id) {
          return (
            <article key={uuidv4()} className="flex justify-start w-full">
              <article className="flex flex-col items-start">
                <article className="flex items-end gap-1">
                  <span className="shadow-md mb-[2px] max-w-[200px] px-2 py-1 rounded-r-lg rounded-tl-lg bg-[#E8F0FE] relative after:contents-[*] after:absolute after:bottom-0 after:left-[-10px] after:w-0 after:h-0 after:border-l-[10px] after:border-l-transparent after:border-b-[10px] after:border-b-[#E8F0FE]">
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
            <article key={uuidv4()} className="flex justify-end w-full">
              <article className="flex flex-col items-end">
                <article className="flex items-end gap-1">
                  {!e.seen && (
                    <span className="text-[10px] text-yellow-500">1</span>
                  )}
                  <span className="shadow-md mb-[2px] max-w-[200px] px-2 py-1 rounded-l-lg rounded-tr-lg relative bg-[#E8F0FE] after:contents-[*] after:absolute after:bottom-0 after:right-[-10px] after:w-0 after:h-0 after:border-r-[10px] after:border-r-transparent after:border-b-[10px] after:border-b-[#E8F0FE]">
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
  );
}
