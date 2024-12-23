import {
  useChatingModalStore,
  useEditorStore,
  useFriendModalStore,
} from "../../../../store/store";
import { useHowTimeStore } from "../../../../store/store";
import LinkButton from "./LinkButton";
import EditorModal from "../../../../components/editor/EditorModal";
import BlogEditor from "../../../../components/editor/BlogEditor";
import { useLoginStore } from "../../../../store/API";
import LoginDialog from "../../../../components/editor/LoginDialog";
import Clock from "../../../../asset/images/Clock.svg";
import Edit from "../../../../asset/images/Edit.svg";
import { t } from "i18next";
import group from "../../../../asset/images/Group-person.svg";
import chat from "../../../../asset/images/Chat.svg";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../api/axios";
import { conversationsType } from "../../../../api/api";

export default function ButtonListComponent() {
  const { toggleEditor } = useEditorStore();
  const { toggleHowTime } = useHowTimeStore();
  const { open } = useFriendModalStore();

  const token = useLoginStore((state) => state.token);
  const user = useLoginStore((state) => state.user);

  const isChatModalOpen = useChatingModalStore(
    (state) => state.isChatModalOpen
  );
  const setIsChatModalOpenTrue = useChatingModalStore(
    (state) => state.setIsChatModalOpenTrue
  );
  const setIsChatModalOpenFalse = useChatingModalStore(
    (state) => state.setIsChatModalOpenFalse
  );
  const setIsContentCloseFalse = useChatingModalStore(
    (state) => state.setIsContentCloseFalse
  );

  const setIsAlertOpen = useEditorStore((state) => state.setIsAlertOpen);

  // 유저 채팅로그 불러오기
  const [hasNewChat, setHasNewChat] = useState<boolean>(false);

  const getConversations = async () => {
    try {
      const getConversations: conversationsType[] = (
        await axiosInstance.get(`messages?userId=${user?._id}`)
      ).data;

      // 마지막 댓글을 확인하기 위해 배열 뒤집기 사용용
      const reversedConversations = getConversations.reverse();
      // 채팅 보낸 유저들 중복없이 모아두기
      const users: string[] = [];
      const chat: conversationsType[] = [];
      reversedConversations.filter((e) => {
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

      let newChat = false;
      chat.map((e) => {
        if (e.sender._id !== user?._id) {
          if (!e.seen) {
            newChat = true;
          }
        }
      });
      setHasNewChat(newChat);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversations();
    const conversationsInterval = setInterval(() => {
      getConversations();
    }, 3000);

    return () => {
      clearInterval(conversationsInterval);
    };
  }, []);

  return (
    <section className="flex justify-between bg-[#D5E6E9] w-[25rem] rounded-[30px] px-6 py-4 mt-20">
      <LinkButton icon={Edit} title={t("글 작성")} onClick={toggleEditor} />
      <article className="relative">
        <LinkButton
          icon={chat}
          title={t("채팅")}
          onClick={() => {
            if (user && token) {
              if (isChatModalOpen) {
                setIsContentCloseFalse();
                setIsChatModalOpenFalse();
              } else {
                setIsChatModalOpenTrue();
              }
            } else {
              setIsAlertOpen();
            }
          }}
        />
        {hasNewChat && (
          <article className="w-[10px] h-[10px] rounded-full bg-[#E14444] absolute top-[7px] right-[22px]"></article>
        )}
      </article>
      <LinkButton
        icon={group}
        title={user && token ? t("친구관리") : t("유저 검색")}
        onClick={open}
        margitTop={"mt-4"}
      />
      <LinkButton icon={Clock} title={t("몇시간?")} onClick={toggleHowTime} />
      <EditorModal>
        <BlogEditor />
      </EditorModal>
      <LoginDialog />
    </section>
  );
}
