import { useEffect, useState } from "react";
import { useTimerStore } from "../../../../store/store";
import achieved_alarm from "../../../../asset/achieved_alarm.mp3";

interface TimerType {
  style: {
    backgroundColor?: string;
    color?: string;
  };
  changingHours?: string;
  isStaticTime?: boolean;
  isFlowTime?: boolean;
  polygonForm?: "square" | "circle";
  alertSound?: boolean;
}

export default function Timer({
  style,
  changingHours,
  isStaticTime = false,
  isFlowTime = false,
  polygonForm = "square",
  alertSound = false,
}: TimerType) {
  const hours = useTimerStore((state) => state.hours);
  const minutes = useTimerStore((state) => state.minutes);
  const seconds = useTimerStore((state) => state.seconds);
  const staticHours = useTimerStore((state) => state.staticHours);
  const staticMinuites = useTimerStore((state) => state.staticMinuites);
  const staticSeconds = useTimerStore((state) => state.staticSeconds);
  const isAchieve = useTimerStore((state) => state.isAchieve);
  const setIsAchieve = useTimerStore((state) => state.setIsAchieve);
  const trophyModalViewed = useTimerStore((state) => state.trophyModalViewed);
  const setTrophyModalNotViewed = useTimerStore(
    (state) => state.setTrophyModalNotViewed
  );
  const alertSoundPlayed = useTimerStore((state) => state.alertSoundPlayed);
  const setAlertSoundPlayed = useTimerStore(
    (state) => state.setAlertSoundPlayed
  );
  const setAlertSoundNotPlayed = useTimerStore(
    (state) => state.setAlertSoundNotPlayed
  );

  // 시간 달성 체크 기능
  const checkAchievement = () => {
    if (Number(staticHours) < hours) {
      !isAchieve && setIsAchieve();
      return;
    } else if (
      Number(staticHours) === hours &&
      Number(staticMinuites) < minutes
    ) {
      !isAchieve && setIsAchieve();
      return;
    } else if (
      Number(staticHours) === hours &&
      Number(staticMinuites) === minutes &&
      Number(staticSeconds) <= seconds &&
      0 !== seconds
    ) {
      !isAchieve && setIsAchieve();
      return;
    } else {
      isAchieve && setIsAchieve();
    }
  };

  const [atFirst, setAtFirse] = useState(true);

  useEffect(() => {
    if (atFirst) return setAtFirse(false);
    checkAchievement();
  }, [seconds]);

  useEffect(() => {
    if (isAchieve && !alertSoundPlayed) {
      if (alertSound) {
        const audio = new Audio(achieved_alarm);
        audio
          .play()
          .then(() => {
            setAlertSoundPlayed();
          })
          .catch((error) => {
            console.error("❌ 알람 소리가 재생되지 않았습니다.", error);
          });
      }
    }
    if (!isAchieve) {
      if (trophyModalViewed === true) {
        setTrophyModalNotViewed();
        setAlertSoundNotPlayed();
      }
    }
  }, [isAchieve]);
  return (
    <>
      <article
        className={`LAB-digital flex flex-col gap-[10px] items-center  w-[25rem] h-[25rem] bg-[#F0F5F8] transition-colors duration-200 mix-blend-multiply ${
          polygonForm === "circle"
            ? "justify-center rounded-full  h-[25rem]"
            : "rounded-[30px]  h-[30rem] pt-24"
        }`}
        style={style}
      >
        {isStaticTime ? (
          <>
            <article className="flex gap-1 text-4xl text-gray-400">
              <span>{changingHours}</span>

              <span>:</span>

              <span>{"00"}</span>

              <span>:</span>

              <span>{"00"}</span>
            </article>
          </>
        ) : null}
        {isFlowTime ? (
          <>
            <article className="flex gap-1 text-4xl text-gray-400">
              <span>{staticHours}</span>

              <span>:</span>

              <span>{staticMinuites}</span>

              <span>:</span>

              <span>{staticSeconds}</span>
            </article>
            <span className="text-[20px] font-black">ㅡ</span>
            <article className="flex gap-1 text-5xl mt-[15px]">
              <span className="w-[50px]">
                {hours < 10 ? `0${hours}` : hours}
              </span>

              <span>:</span>

              <span className="w-[50px]">
                {minutes < 10 ? `0${minutes}` : minutes}
              </span>

              <span>:</span>

              <span className="w-[50px]">
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </article>
          </>
        ) : null}
      </article>
    </>
  );
}
