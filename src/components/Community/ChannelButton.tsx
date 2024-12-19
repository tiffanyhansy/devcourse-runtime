import { Tooltip } from "@mui/material";
import { Link } from "react-router";

type Props = {
  title: string; // 툴팁에 표시될 제목
  link: string; // 이동할 링크
  label: string; // 버튼에 표시될 텍스트
  isActive: boolean; // 활성화 여부
  onClick: () => void; // 클릭 이벤트 핸들러
};

export default function ChannelButton({
  title,
  link,
  label,
  isActive,
  onClick,
}: Props) {
  return (
    <Tooltip title={title} arrow>
      <article className="w-16 mr-4">
        <button
          onClick={onClick} // 클릭 이벤트 핸들러 연결
          className={`font-bold px-3 py-1 rounded-[10px] w-16 text-center opacity-80 transition-colors ${
            isActive
              ? "bg-black text-white" // 활성화된 버튼 스타일
              : "bg-[#7EACB5] text-white hover:bg-[#90bdc7] hover:text-white" // 비활성화된 버튼 스타일
          }`}
        >
          {label}
        </button>
      </article>
    </Tooltip>
  );
}
