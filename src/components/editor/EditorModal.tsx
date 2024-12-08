import { useState } from "react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function EditorModal({ isOpen, onClose, children }: ModalProps) {
  const [resetEditor, setResetEditor] = useState(false);

  // 모달이 닫힐 때 에디터를 초기화
  const handleClose = () => {
    setResetEditor(true);
    onClose();
  };

  // 모달이 열릴 때
  if (isOpen && resetEditor) {
    setResetEditor(false);
  }

  return (
    <>
      {/* 모달 뒷 배경 */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 z-40 flex items-center justify-center transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      >
        {/* 에디터 본체 */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative w-[1080px] min-h-[640px] max-w-[90%] 
            rounded-[10px] overflow-auto transition-all duration-500 ${
              isOpen
                ? "scale-100 opacity-100 translate-y-0 bg-gray-50" //에디터 배경색 조절은 여기서
                : "scale-90 opacity-0 -translate-y-10 bg-gray-50"
            }`}
        >
          <div className="relative p-6">
            {children &&
              React.cloneElement(children as React.ReactElement, {
                resetEditor,
              })}
          </div>
        </div>
      </div>
    </>
  );
}
