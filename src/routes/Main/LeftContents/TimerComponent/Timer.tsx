interface TimerType {
  style: {
    backgroundColor?: string;
    color?: string;
  };
  hours: string;
  minuites: string;
  seconds: string;
}

export default function Timer({ style, hours, minuites, seconds }: TimerType) {
  return (
    <>
      <article
        className={`timer-shadow flex items-center justify-center w-[25rem] h-[25rem] rounded-full bg-[#F0F5F8] mb-5 transition-colors duration-200`}
        style={style}
      >
        <article className="flex gap-1 text-5xl">
          <span>{hours}</span>
          <span>:</span>
          <span>{minuites}</span>
          <span>:</span>
          <span>{seconds}</span>
        </article>
      </article>
    </>
  );
}
