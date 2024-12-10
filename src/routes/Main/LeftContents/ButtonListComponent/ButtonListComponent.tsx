import { useHowTimeStore } from "../../../../store/store";
import LinkButton from "./LinkButton";

export default function ButtonListComponent() {
  const { toggleHowTime } = useHowTimeStore();
  return (
    <section className="flex gap-[20px]">
      <LinkButton icon={"/src/asset/images/Edit.svg"} title={"글 작성"} />
      <LinkButton icon={"/src/asset/images/Chat.svg"} title={"게시판"} />
      <LinkButton
        icon={"/src/asset/images/Group-person.svg"}
        title={"친구관리"}
      />
      <LinkButton
        icon={"/src/asset/images/Clock.svg"}
        title={"몇시간?"}
        onClick={toggleHowTime}
      />
    </section>
  );
}
