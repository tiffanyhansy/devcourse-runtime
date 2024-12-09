import HowTimeTimer from "./HowTimeTimer";
import HowTimeTop from "./HowTimeTop";
import HowTimeUnder from "./HowTimeUnder";

export default function HowTimeContents({
  changingHours,
  setRestart,
}: {
  changingHours: string;
  setRestart: (e: React.SetStateAction<number>) => void;
}) {
  return (
    <>
      <HowTimeTop changingHours={changingHours} />
      <HowTimeTimer changingHours={changingHours} />
      {/* <HowTimeUnder setRestart={setRestart} /> */}
    </>
  );
}
