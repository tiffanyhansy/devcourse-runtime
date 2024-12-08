import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css"; // Quill 기본 테마
import "../css/QuillCustom.css"; // 커스텀 스타일

interface BlogEditorProps {
  onSave: (content: string) => void;
  onClose: () => void;
  resetEditor: boolean;
}

export default function BlogEditor({
  onSave,
  onClose,
  resetEditor,
}: BlogEditorProps) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (resetEditor) {
      resetContent();
    }
  }, [resetEditor]);

  // 텍스트 초기화
  const resetContent = () => {
    setContent("");
    setTitle("");
  };
  //react-quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // 헤더
      ["bold", "italic", "underline"], // 텍스트 스타일
      [{ color: [] }], // 글자 색상
      [{ list: "ordered" }, { list: "bullet" }], // 리스트
      ["link", "image"], // 링크와 이미지 삽입
      ["clean"], // 초기화 버튼
    ],
  };
  //react-quill

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "color",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="relative flex flex-col h-full text-white">
      {/* 상단 툴바 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-black">(optional)</h1>
        <button
          onClick={() => {
            resetContent();
            onClose();
          }}
          className="text-black hover:text-red-400 transition"
        >
          ✕ 닫기
        </button>
      </div>

      {/* 제목과 텍스트 영역 */}
      <div className="flex flex-col flex-grow space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요..."
          className="w-full bg-transparent text-3xl font-semibold text-black placeholder-gray-600 border-b border-white/30 focus:outline-none pb-2"
        />

        {/* Quill 에디터 */}
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

      {/* 하단 버튼 */}
      <div className="fixed bottom-10 right-4 flex space-x-4">
        <button
          onClick={() => {
            resetContent();
            onClose(); // 모달 닫기
          }}
          className="px-6 py-2 bg-[#D6D6D6] rounded-lg text-black hover:bg-red-500/60 transition"
        >
          취소
        </button>
        <button
          onClick={() => {
            onSave(content);
            resetContent(); // 저장 후 내용 초기화
          }}
          className="px-6 py-2 bg-[#7EACB5] rounded-lg text-white hover:bg-green-500/60 transition"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
