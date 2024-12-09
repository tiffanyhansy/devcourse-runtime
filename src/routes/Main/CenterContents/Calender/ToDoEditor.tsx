import { useEffect, useRef } from "react";
import { useToDoStore } from "../../../../store/store";
import { v4 as uuidv4 } from "uuid";

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
    <li className="w-full h-[50px] border-b flex gap-[20px] border-[#D0E5F9]">
      <input
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
              JSON.stringify([...ToDoList, { text: EditorText, id: uuidv4() }])
            );
          }
        }}
        value={EditorText}
        className="w-full h-full"
      />
    </li>
  );
}
