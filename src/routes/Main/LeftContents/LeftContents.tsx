import ButtonListComponent from "./ButtonListComponent/ButtonListComponent";
import TimerComponent from "./TimerComponent/TimerComponent";

export default function LeftContents() {
  return (
    <section className="flex flex-col items-center">
      <TimerComponent />
      <ButtonListComponent />
    </section>
  );
}
