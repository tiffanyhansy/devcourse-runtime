import React, { useEffect, useState } from "react";
import { useHowTimeStore } from "../../store/store";
import Timer from "../../routes/Main/LeftContents/TimerComponent/Timer";
import HowTimeTimer from "./HowTimeContents/HowTimeTimer";
import HowTimeUnder from "./HowTimeContents/HowTimeUnder";
import HowTimeTop from "./HowTimeContents/HowTimeTop";
import HowTimeHeader from "./howTimeHeader/HowTimeHeader";
import HowTimeContents from "./HowTimeContents/HowTimeContents";

export default function HowTimeModal() {
  const toggleHowTime = useHowTimeStore((state) => state.toggleHowTime);
  // 랜덤 시간 생성기
  const randomTime = Math.floor(Math.random() * 24 + 1).toString();
  // 난수 몇 번 반복하는지
  const [count, setCount] = useState(10);
  const [howTimeHoursSet, setHowTimeHoursSet] = useState("0");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count > 0) {
        setHowTimeHoursSet(randomTime);
        setCount(count - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [howTimeHoursSet, count]);

  return (
    <section className="w-full h-full block absolute left-0 top-0 z-40">
      <div
        className="w-full h-full block bg-black bg-opacity-70"
        onClick={toggleHowTime}
      ></div>
      <article className="w-full max-w-[1152px] h-[819px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[10px]">
        <HowTimeHeader />
        <HowTimeContents howTimeHoursSet={howTimeHoursSet} />
      </article>
    </section>
  );
}
