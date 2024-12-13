import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../css/QuillCustom.css";
import { useEditorStore } from "../../store/store";
import { usePostStore } from "../../store/postStore"; // postStore 임포트
import ConfirmDialog from "./ConfirmDialog";
import Button from "../common/SquareButton";

export default function BlogEditor() {
  const {
    content,
    title,
    isDialogOpen,
    toggleEditor,
    setContent,
    setTitle,
    toggleDialog,
    resetEditor,
  } = useEditorStore();

  const { post, isLoading, error } = usePostStore();

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || content.trim() === "<p><br></p>") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    await post(title, content); // POST 요청 실행
    resetEditor(); // 에디터 초기화
    toggleEditor(); // 에디터 닫기
  };

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
        <h1 className="text-xl font-bold text-black pl-3">(optional)</h1>
        <div className="flex gap-2 pt-1">
          <Button
            variant="primary"
            size="xs"
            textSize="sm"
            className="font-normal hover:bg-[#96ccd6]"
            onClick={handleSave}
            disabled={isLoading} // 로딩 중이면 비활성화
          >
            {isLoading ? "저장 중..." : "저장하기"}
          </Button>
          <Button
            onClick={handleCancel}
            variant="secondary"
            size="closeEditor"
            className="font-normal transition hover:bg-[#C96868] hover:text-white"
            textSize="sm"
          >
            ✕
          </Button>
        </div>
      </div>

      <div className="flex flex-col flex-grow pb-20 space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요..."
          className="w-full pb-2 pl-4 text-3xl font-semibold text-black placeholder-gray-600 bg-transparent border-b border-white/30 focus:outline-none"
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
      {error && <p className="text-red-500">저장 중 오류 발생: {error}</p>}
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
