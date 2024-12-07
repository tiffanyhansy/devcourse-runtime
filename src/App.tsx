import EditorModal from "./components/editor/EditorModal";
import BlogEditor from "./components/editor/BlogEditor";
import useEditorStore from "./store/editorSTore";

export default function App() {
  const { isEditorOpen, toggleEditor, saveContent } = useEditorStore();

  return (
    <div>
      <button
        onClick={toggleEditor}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        test
      </button>
      <EditorModal isOpen={isEditorOpen} onClose={toggleEditor}>
        <BlogEditor onSave={saveContent} onClose={toggleEditor} />
      </EditorModal>
    </div>
  );
}
