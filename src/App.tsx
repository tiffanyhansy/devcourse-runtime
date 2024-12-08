import EditorModal from "./components/editor/EditorModal";
import BlogEditor from "./components/editor/BlogEditor";
import useEditorStore from "./store/editorStore";
import Main from "./routes/Main/Main";
import Header from "./routes/LayOut/Header";

export default function App() {
  const { isEditorOpen, toggleEditor, saveContent } = useEditorStore();

  return (
    <main className="px-[50px] mx-auto roboto-medium max-w-[1440px]">
      <Header />
      <Main />
    </main>
  );
}
