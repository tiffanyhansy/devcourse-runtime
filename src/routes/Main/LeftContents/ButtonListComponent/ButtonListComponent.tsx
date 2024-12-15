import { useEditorStore, useFriendModalStore } from "../../../../store/store";
import { useHowTimeStore } from "../../../../store/store";
import LinkButton from "./LinkButton";
import EditorModal from "../../../../components/editor/EditorModal";
import BlogEditor from "../../../../components/editor/BlogEditor";
import { useLoginStore } from "../../../../store/API";

export default function ButtonListComponent() {
  const { toggleEditor } = useEditorStore();
  const { toggleHowTime } = useHowTimeStore();
  const saveContent = (content: string) => {
    console.log("출간된 내용:", content);
    toggleEditor();
  };
  const { open } = useFriendModalStore();

  const token = useLoginStore((state) => state.token);

  return (
    <section className="flex gap-[20px]">
      <LinkButton
        icon={"/src/asset/images/Edit.svg"}
        title={"글 작성"}
        onClick={toggleEditor}
      />
      <LinkButton icon={"/src/asset/images/Chat.svg"} title={"게시판"} />
      <LinkButton
        icon={"/src/asset/images/Group-person.svg"}
        title={token ? "친구관리" : "유저 검색"}
        onClick={open}
      />
      <LinkButton
        icon={"/src/asset/images/Clock.svg"}
        title={"몇시간?"}
        onClick={toggleHowTime}
      />
      <EditorModal>
        <BlogEditor onSave={saveContent} />
      </EditorModal>
    </section>
  );
}
