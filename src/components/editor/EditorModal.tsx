import React from "react";
import { useEditorStore } from "../../store/store";
import ConfirmDialog from "./ConfirmDialog";
import { usePostStore } from "../../store/postStore";

interface ModalProps {
  children?: React.ReactNode;
}

export default function EditorModal({ children }: ModalProps) {
  const {
    isOpen,
    toggleEditor,

    resetEditor,
    isDialogOpen,
    toggleDialog,
    isShake,
    handleCancel,
  } = useEditorStore();

  const { setImage } = usePostStore();

  const confirmClose = () => {
    resetEditor();
    toggleDialog(false);
    toggleEditor(); // 에디터 닫기
  };

  const cancelClose = () => {
    toggleDialog(false); // ConfirmDialog 닫기
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 z-40 flex items-center justify-center transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => handleCancel(setImage)}
      >
        <div
          onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
          className={`relative w-[1080px] min-h-[640px] max-w-[90%] max-h-[80%] rounded-[10px] overflow-hidden transition-transform duration-500 bg-gray-50 ${
            isOpen ? "scale-100" : "scale-90"
          } ${isShake ? "animate-shake" : ""}`}
        >
          <div className="relative p-6">{children}</div>
        </div>
      </div>
      <ConfirmDialog
        open={isDialogOpen}
        title="에디터 닫기"
        description="작성 중인 내용이 있습니다. 정말로 닫으시겠습니까?"
        onConfirm={confirmClose}
        onCancel={cancelClose}
      />
    </>
  );
}
