import EditorModal from "./components/editor/EditorModal";
import BlogEditor from "./components/editor/BlogEditor";
import useEditorStore from "./store/store";
import Main from "./routes/Main/Main";
import Header from "./routes/LayOut/Header";
import { useEffect } from "react";

export default function App() {
  const { isEditorOpen, toggleEditor, saveContent } = useEditorStore();
  useEffect(() => {
    if (!localStorage.getItem("ToDoList")) {
      localStorage.setItem("ToDoList", "[]");
    }
  }, []);
  return (
    <main className="px-[50px] mx-auto roboto-medium max-w-[1440px]">
      <Header />
      <Main />
    </main>
  );
}
