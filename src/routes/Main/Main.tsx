import LeftContents from "./LeftContents/LeftContents";
import RightContents from "./RightComponent/RightContents";
import CenterContents from "./CenterContents/CenterContents";
import { useHowTimeStore } from "../../store/store";
import Button from "../../components/common/Button";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import HowTimeModal from "../../components/howTime/HowTimeModal";
import { useFriendModalStore } from "../../store/store";
import FriendManageModal from "../../components/Modal/FriendManageModal";

export default function Main() {
  const isHowTimeOpen = useHowTimeStore((state) => state.isHowTimeOpen);
  const modal = useFriendModalStore((s) => s.modal);
  return (
    <section>
      <article className="flex items-end mt-32">
        <h1 className="text-[50px] text-[#3E435D] mr-5">
          <span className="font-bold">조명</span>님, 오늘도 열공하세요!!
        </h1>

        <Button
          size="xl"
          variant="todo"
          textSize="lg"
          className="text-[#7eacb5] w-fit font-semibold flex content-center"
        >
          {"오늘의 목표 설정하기"}
          <KeyboardArrowRightRoundedIcon
            style={{ fontWeight: "bolder", fontSize: "30px" }}
          />
        </Button>
      </article>
      {/* 컨텐츠 */}
      <section className="mt-[60px] flex justify-between">
        {/* 좌측 컨텐츠 */}
        <LeftContents />
        {/* 중앙 컨텐츠 */}
        <CenterContents />
        {/* 우측 컨텐츠 */}
        <RightContents />
      </section>
      {isHowTimeOpen ? <HowTimeModal /> : null}
      {modal ? <FriendManageModal /> : null}
    </section>
  );
}
