import { useEditorStore, useFriendModalStore } from "../../../../store/store";
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

export default function ButtonListComponent() {
  const { toggleEditor } = useEditorStore();
  const { toggleHowTime } = useHowTimeStore();
  const { open } = useFriendModalStore();

  const token = useLoginStore((state) => state.token);

  return (
    <section className="flex justify-between bg-[#D5E6E9] w-[25rem] rounded-[30px] px-6 py-4 mt-20">
      <LinkButton icon={Edit} title={t("글 작성")} onClick={toggleEditor} />
      <LinkButton icon={"/src/asset/images/Chat.svg"} title={t("게시판")} />
      <LinkButton
        icon={group}
        title={token ? t("친구관리") : t("유저 검색")}
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
