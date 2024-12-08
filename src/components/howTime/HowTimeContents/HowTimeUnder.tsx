import Button from "../../common/Button";

export default function HowTimeUnder() {
  return (
    <article className="flex flex-col items-center gap-5 translate-y-[30px] opacity-0 animate-fadeIn_2s">
      <span className="text-[40px] font-bold ">
        자, 이제 공부하러 가볼까요? 📖
      </span>

      {/* 기타 CSS 지정해야 합니다! */}
      <Button size="sm" variant="custom" textSize="md" className="">
        좋아요 🔥
      </Button>
      <Button size="md" variant="custom" textSize="md" className="">
        다시 할래요 🤔
      </Button>
    </article>
  );
}
