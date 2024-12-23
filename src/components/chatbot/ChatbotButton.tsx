import mascot_nobg from "../../asset/images/mascot_nobg.svg";

declare global {
  interface Window {
    openCXGenieChatWidget: () => void;
  }
}

function ChatbotButton() {
  return (
    <button
      className="fixed p-1 pl-2 bg-white border-[#ebebeb] border-solid rounded-full shadow-md w-14 h-14 bottom-10 right-10 border-[1px]"
      onClick={() => window.openCXGenieChatWidget()}
    >
      <img src={mascot_nobg} alt="chatbot" className="" />
    </button>
  );
}

export default ChatbotButton;
