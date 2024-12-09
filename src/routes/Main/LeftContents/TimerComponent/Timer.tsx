import { useTimerStore } from "../../../../store/store";

interface TimerType {
  style: {
    backgroundColor?: string;
    color?: string;
  };
  staticHours?: string;
  staticMinuites?: string;
  staticSeconds?: string;
}

export default function Timer({
  style,
  staticHours,
  staticMinuites,
  staticSeconds,
}: TimerType) {
  const hours = useTimerStore((state) => state.hours);
  const minutes = useTimerStore((state) => state.minutes);
  const seconds = useTimerStore((state) => state.seconds);
  return (
    <>
      <article
        className={`timer-shadow flex items-center justify-center w-[25rem] h-[25rem] rounded-full bg-[#F0F5F8] mb-5 transition-colors duration-200`}
        style={style}
      >
        <article className="flex gap-1 text-5xl">
          {staticHours ? (
            <span>{staticHours}</span>
          ) : (
            <span>{hours < 10 ? `0${hours}` : hours}</span>
          )}
          <span>:</span>
          {staticMinuites ? (
            <span>{staticMinuites}</span>
          ) : (
            <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
          )}
          <span>:</span>
          {staticSeconds ? (
            <span>{staticSeconds}</span>
          ) : (
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          )}
        </article>
      </article>
    </>
  );
}
