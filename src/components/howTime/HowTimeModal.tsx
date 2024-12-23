import { useEffect, useState } from "react";
import Button from "../common/SquareButton";
import { useHowTimeStore, useTimerStore } from "../../store/store";
import HowTimeHeader from "./howTimeHeader/HowTimeHeader";
import HowTimeContents from "./HowTimeContents/HowTimeContents";
import { t } from "i18next";

export default function HowTimeModal() {
  const toggleHowTime = useHowTimeStore((state) => state.toggleHowTime);
  // 랜덤 시간 생성기
  const randomTime = Math.floor(Math.random() * 24 + 1).toString();
  // 난수 몇 번 반복하는지
  const [count, setCount] = useState(10);
  const setChangingHours = useHowTimeStore((state) => state.setChangingHours);
  const changingHours = useHowTimeStore((state) => state.changingHours);

  const setStaticHours = useTimerStore((state) => state.setStaticHours);
  const setStaticMinuites = useTimerStore((state) => state.setStaticMinuites);
  const setStaticSeconds = useTimerStore((state) => state.setStaticSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count > 0) {
        setChangingHours(randomTime);
        setCount(count - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [changingHours, count]);

  return (
    <section className="absolute top-0 left-0 z-40 block w-full h-full">
      <div
        className="block w-full h-full bg-black bg-opacity-70"
        onClick={toggleHowTime}
      ></div>
      <article className="w-full max-w-[1152px] h-[820px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[10px]">
        <HowTimeHeader />
        <article className="px-[50px] pt-[30px]">
          <HowTimeContents changingHours={changingHours} />
          <article className="flex flex-col items-center gap-4 translate-y-[30px] opacity-0 animate-fadeIn_2s">
            <span className="text-[40px] font-bold">
              {t("자, 이제 공부하러 가볼까요? 📖")}
            </span>

            {/* 기타 CSS 지정해야 합니다! */}
            <Button
              size="sm"
              variant="custom"
              textSize="md"
              className="hover:bg-[#96ccd6]"
              onClick={() => {
                setStaticHours(changingHours);
                setStaticMinuites("00");
                setStaticSeconds("00");
                localStorage.setItem(
                  "StaticTimerTime",
                  JSON.stringify([changingHours, "00", "00"])
                );
                toggleHowTime();
              }}
            >
              {t("좋아요!")}
            </Button>
            <Button
              size="md"
              variant="outline"
              textSize="md"
              onClick={() => {
                // 다시 count 0 에서 10으로 변경해 랜덤시간 재실행
                setCount(() => 10);
              }}
            >
              {t("다시 할래요")}
            </Button>
          </article>
        </article>
      </article>
    </section>
  );
}
