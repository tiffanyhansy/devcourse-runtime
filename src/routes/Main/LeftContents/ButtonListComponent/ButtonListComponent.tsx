import { useEditorStore, useFriendModalStore } from "../../../../store/store";
import { useHowTimeStore } from "../../../../store/store";
import LinkButton from "./LinkButton";
import EditorModal from "../../../../components/editor/EditorModal";
import BlogEditor from "../../../../components/editor/BlogEditor";
import { useLoginStore } from "../../../../store/API";
import LoginDialog from "../../../../components/editor/LoginDialog";
import Chat from "../../../../asset/images/Chat.svg";
import Clock from "../../../../asset/images/Clock.svg";
import Edit from "../../../../asset/images/Edit.svg";

export default function ButtonListComponent() {
  const { toggleEditor } = useEditorStore();
  const { toggleHowTime } = useHowTimeStore();
  const { open } = useFriendModalStore();

  const token = useLoginStore((state) => state.token);

  return (
    <section className="flex gap-[10px]">
      <LinkButton icon={Edit} title={"글 작성"} onClick={toggleEditor} />
      <LinkButton icon={"/src/asset/images/Chat.svg"} title={"게시판"} />
      <LinkButton
        icon={Chat}
        title={token ? "친구관리" : "유저 검색"}
        onClick={open}
      />
      <LinkButton icon={Clock} title={"몇시간?"} onClick={toggleHowTime} />
      <EditorModal>
        <BlogEditor />
      </EditorModal>
      <LoginDialog />
    </section>
  );
}
