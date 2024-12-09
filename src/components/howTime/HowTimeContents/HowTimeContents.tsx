import HowTimeTimer from "./HowTimeTimer";
import HowTimeTop from "./HowTimeTop";
import HowTimeUnder from "./HowTimeUnder";

export default function HowTimeContents({
  howTimeHoursSet,
}: {
  howTimeHoursSet: string;
}) {
  return (
    <article className="px-[50px] py-[30px]">
      <HowTimeTop howTimeHoursSet={howTimeHoursSet} />
      <HowTimeTimer howTimeHoursSet={howTimeHoursSet} />
      <HowTimeUnder />
    </article>
  );
}
