import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../css/QuillCustom.css";
import { useEditorStore } from "../../store/store";
import ConfirmDialog from "./ConfirmDialog";

export default function BlogEditor({
  onSave,
}: {
  onSave: (content: string) => void;
}) {
  const {
    content,
    title,
    setContent,
    setTitle,
    resetEditor,
    isDialogOpen,
    toggleDialog,
    toggleEditor,
  } = useEditorStore();

  const handleCancel = () => {
    if ((content.trim() && content.trim() !== "<p><br></p>") || title.trim()) {
      toggleDialog(true); // ConfirmDialog 열기
    } else {
      resetEditor();
      toggleEditor(); // 내용이 없으면 바로 닫기
    }
  };

  const confirmClose = () => {
    toggleDialog(false);
    resetEditor();
    toggleEditor();
  };

  const cancelClose = () => {
    toggleDialog(false);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "color",
    "list",
    "link",
    "image",
  ];

  return (
    <div className="relative flex flex-col text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-black">(optional)</h1>
        <button
          onClick={handleCancel}
          className="text-black hover:text-red-400 transition"
        >
          ✕ 닫기
        </button>
      </div>

      <div className="flex flex-col flex-grow space-y-6 pb-20">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요..."
          className="pl-3 w-full bg-transparent text-3xl font-semibold text-black placeholder-gray-600 border-b border-white/30 focus:outline-none pb-2"
        />
        <div className="flex-grow">
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="여기에 내용을 입력하세요..."
            theme="snow"
          />
        </div>
      </div>

      <div className="absolute flex bottom-0 right-3 gap-5 w-[60%] max-w-md justify-end px-4">
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-[#D6D6D6] rounded-lg text-black hover:bg-red-500/60 transition"
        >
          취소
        </button>
        <button
          onClick={() => {
            onSave(content);
            resetEditor();
          }}
          className="px-6 py-2 bg-[#7EACB5] rounded-lg text-white hover:bg-green-500/60 transition"
        >
          저장하기
        </button>
      </div>

      <ConfirmDialog
        open={isDialogOpen}
        title="에디터 닫기"
        description="작성 중인 내용이 있습니다. 정말로 닫으시겠습니까?"
        onConfirm={confirmClose}
        onCancel={cancelClose}
      />
    </div>
  );
}
