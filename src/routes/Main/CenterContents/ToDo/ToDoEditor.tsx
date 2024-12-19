import { useEffect, useRef } from "react";
import { useToDoStore } from "../../../../store/store";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../../components/common/SquareButton";

export default function ToDoEditor() {
  const editorInputRef = useRef<HTMLInputElement>(null);
  const updateEditorText = useToDoStore((state) => state.updateEditorText);
  const toggleShowEditor = useToDoStore((state) => state.toggleShowEditor);
  const isShowEditor = useToDoStore((state) => state.isShowEditor);
  const EditorText = useToDoStore((state) => state.EditorText);
  const updateToDoList = useToDoStore((state) => state.updateToDoList);
  const ToDoList = useToDoStore((store) => store.ToDoList);

  useEffect(() => {
    if (isShowEditor && editorInputRef.current) {
      editorInputRef.current.focus();
    }
  }, [isShowEditor]);
  return (
    <li className="w-full h-[50px] border-b flex border-[#D0E5F9]">
      <input
        placeholder="console.log(                                               );"
        type="text"
        ref={editorInputRef}
        onChange={(event) => {
          updateEditorText(event);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            if (EditorText === "") return toggleShowEditor();
            updateToDoList();
            toggleShowEditor();
            localStorage.setItem(
              "ToDoList",
              JSON.stringify([
                ...ToDoList,
                { text: EditorText, id: uuidv4(), checked: false },
              ])
            );
          }
        }}
        value={EditorText}
        className="w-full h-full py-5 pl-5 outline-none bg-[#F0F5F8]"
      />
      <Button
        size="lg" // 버튼 크기
        variant="todo" // 사용자 정의 스타일
        textSize="sm" // 텍스트 크기
        className="flex items-center justify-center gap-[20px] w-[60px] h-full rounded-full hover:bg-[#e9e9e9]"
        onClick={() => {
          if (EditorText === "") return toggleShowEditor();
          updateToDoList();
          toggleShowEditor();
          localStorage.setItem(
            "ToDoList",
            JSON.stringify([
              ...ToDoList,
              { text: EditorText, id: uuidv4(), checked: false },
            ])
          );
        }}
      >
        <img src={"/src/asset/images/small_icon.svg"} alt={"추가 아이콘"} />
      </Button>
    </li>
  );
}
