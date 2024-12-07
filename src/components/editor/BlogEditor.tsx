import { useState } from "react";

interface BlogEditorProps {
  onSave: () => void;
  onClose: () => void;
}

export default function BlogEditor({ onSave, onClose }: BlogEditorProps) {
  const [content, setContent] = useState("");

  return (
    <>
      {/* 제목 */}
      <div className="relative flex-col text-left mb-4">
        <h1 className="text-2xl font-bold text-white mb-2">
          <textarea
            placeholder="제목을 입력하세요"
            className=" w-full h-[36px] bg-transparent resize-none rounded-[10px] placeholder:text-white focus:placeholder-transparent align-baseline focus:outline-none focus:ring-1 focus:ring-white "
          ></textarea>
        </h1>
        <hr className="border-t-8 border-white w-12" />
      </div>

      {/* 내용 */}
      <div className="text-white text-lg mb-4">
        <textarea
          className="w-full h-96 bg-transparent border border-white rounded-[10px] p-4 resize-none focus:outline-none focus:ring-1 focus:ring-white placeholder:text-white placeholder-opacity-75 focus:placeholder-transparent"
          placeholder="내용을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* 버튼 */}
      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="bg-[#FADFA1] text-[#333] rounded-md px-4 py-2 hover:bg-[#d8c277]"
        >
          나가기
        </button>
        <button
          onClick={onSave}
          className="bg-[#FADFA1] text-[#333] rounded-md px-4 py-2 hover:bg-[#d8c277]"
        >
          출간하기
        </button>
      </div>
    </>
  );
}
