import { useEditorStore } from "../../../../store/store";
import { useHowTimeStore } from "../../../../store/store";
import LinkButton from "./LinkButton";
// import EditorModal from "../../../../components/editor/EditorModal";
// import BlogEditor from "../../../../components/editor/BlogEditor";

export default function ButtonListComponent() {
  // const { toggleEditor } = useEditorStore();
  const { toggleHowTime } = useHowTimeStore();

  // const saveContent = (content: string) => {
  //   console.log("출간된 내용:", content);
  //   toggleEditor();
  // };

  return (
    <section className="flex gap-[20px]">
      <LinkButton
        icon={"/src/asset/images/Edit.svg"}
        title={"글 작성"}
        // onClick={toggleEditor}
      />
      <LinkButton icon={"/src/asset/images/Chat.svg"} title={"게시판"} />
      <LinkButton
        icon={"/src/asset/images/Group-person.svg"}
        title={"친구관리"}
      />
      <LinkButton
        icon={"/src/asset/images/Clock.svg"}
        title={"몇시간?"}
        onClick={toggleHowTime}
      />
      {/* <EditorModal>
        <BlogEditor onSave={saveContent} />
      </EditorModal> */}
    </section>
  );
}
