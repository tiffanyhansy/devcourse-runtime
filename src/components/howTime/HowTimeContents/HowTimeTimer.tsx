import Timer from "../../../routes/Main/LeftContents/TimerComponent/Timer";

export default function HowTimeTimer({
  changingHours,
}: {
  changingHours: string;
}) {
  return (
    <article className="w-full flex items-center justify-center mt-[30px] translate-y-[30px] opacity-0 animate-fadeIn_1s">
      <Timer style={{}} changingHours={changingHours} isStaticTime={true} />
    </article>
  );
}
