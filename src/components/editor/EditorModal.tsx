interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function EditorModal({ isOpen, onClose, children }: ModalProps) {
  return (
    <>
      {/* 모달 뒷 배경 */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 ${
          isOpen ? "block" : "hidden"
        } z-40`}
        onClick={onClose}
      ></div>

      {/* 모달 본체 */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#7EACB5] rounded-lg shadow-lg transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-0"
        } z-50 w-[1080px] h-[640px]  max-w-[90%] p-6`}
      >
        {children}
      </div>
    </>
  );
}
