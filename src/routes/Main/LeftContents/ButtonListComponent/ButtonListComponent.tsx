import { useHowTimeStore } from "../../../../store/store";
import LinkButton from "./LinkButton";

export default function ButtonListComponent() {
  const { toggleHowTime } = useHowTimeStore();
  return (
    <section className="flex gap-[20px]">
      <LinkButton icon={"./Edit.svg"} title={"글 작성"} />
      <LinkButton icon={"./Chat.svg"} title={"게시판"} />
      <LinkButton icon={"./Group-person.svg"} title={"친구관리"} />
      <LinkButton
        icon={"./Clock.svg"}
        title={"몇시간?"}
        onClick={toggleHowTime}
      />
    </section>
  );
}
