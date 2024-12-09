// 일단 이 컴포넌트 페이지 보류입니다.(다시할래요 버튼으로 모달창 애니메이션을 조작할 수 없어서 모달창에 통째로 꺼냈습니다.)
import { useHowTimeStore } from "../../../store/store";
import Button from "../../common/Button";

export default function HowTimeUnder({
  setRestart,
}: {
  setRestart: (e: React.SetStateAction<number>) => void;
}) {
  return (
    <article className="flex flex-col items-center gap-5 translate-y-[30px] opacity-0 animate-fadeIn_2s">
      <span className="text-[40px] font-bold ">
        자, 이제 공부하러 가볼까요? 📖
      </span>

      {/* 기타 CSS 지정해야 합니다! */}
      <Button size="sm" variant="custom" textSize="md" className="">
        좋아요 🔥
      </Button>
      <Button
        size="md"
        variant="custom"
        textSize="md"
        onClick={() => {
          setRestart((e) => e + 1);
        }}
      >
        다시 할래요 🤔
      </Button>
    </article>
  );
}
