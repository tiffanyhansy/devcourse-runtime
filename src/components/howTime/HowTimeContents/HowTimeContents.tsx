import HowTimeTimer from "./HowTimeTimer";
import HowTimeTop from "./HowTimeTop";

export default function HowTimeContents({
  changingHours,
}: {
  changingHours: string;
}) {
  return (
    <>
      <HowTimeTop changingHours={changingHours} />
      <HowTimeTimer changingHours={changingHours} />
    </>
  );
}
