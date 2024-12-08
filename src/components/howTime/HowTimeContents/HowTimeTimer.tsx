import Timer from "../../../routes/Main/LeftContents/TimerComponent/Timer";

export default function HowTimeTimer({
  howTimeHoursSet,
}: {
  howTimeHoursSet: string;
}) {
  return (
    <article className="w-full flex items-center justify-center mt-[30px] translate-y-[30px] opacity-0 animate-fadeIn_1s">
      <Timer style={{}} hours={howTimeHoursSet} minuites="00" seconds="00" />
    </article>
  );
}
