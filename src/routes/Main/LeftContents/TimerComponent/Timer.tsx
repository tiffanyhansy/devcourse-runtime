import { useTimerStore } from "../../../../store/store";

interface TimerType {
  style: {
    backgroundColor?: string;
    color?: string;
  };
  changingHours?: string;
  isStaticTime?: boolean;
  isFlowTime?: boolean;
}

export default function Timer({
  style,
  changingHours,
  isStaticTime = false,
  isFlowTime = false,
}: TimerType) {
  const hours = useTimerStore((state) => state.hours);
  const minutes = useTimerStore((state) => state.minutes);
  const seconds = useTimerStore((state) => state.seconds);
  const staticHours = useTimerStore((state) => state.staticHours);
  const staticMinuites = useTimerStore((state) => state.staticMinuites);
  const staticSeconds = useTimerStore((state) => state.staticSeconds);
  return (
    <>
      <article
        className={`timer-shadow flex flex-col gap-[10px] items-center justify-center w-[25rem] h-[25rem] rounded-full bg-[#F0F5F8] mb-5 transition-colors duration-200`}
        style={style}
      >
        {isStaticTime ? (
          <>
            <article className="flex gap-1 text-4xl text-gray-400">
              <span>{changingHours}</span>

              <span>:</span>

              <span>{staticMinuites}</span>

              <span>:</span>

              <span>{staticSeconds}</span>
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
              <span>{hours < 10 ? `0${hours}` : hours}</span>

              <span>:</span>

              <span>{minutes < 10 ? `0${minutes}` : minutes}</span>

              <span>:</span>

              <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
            </article>
          </>
        ) : null}
      </article>
    </>
  );
}
