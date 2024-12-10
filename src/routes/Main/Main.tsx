import LeftContents from "./LeftContents/LeftContents";
import RightContents from "./RightComponent/RightContents";
import CenterContents from "./CenterContents/CenterContents";
import { useHowTimeStore } from "../../store/store";
import HowTimeModal from "../../components/howTime/HowTimeModal";
import TopContents from "./TopContents/TopContents";

export default function Main() {
  const isHowTimeOpen = useHowTimeStore((state) => state.isHowTimeOpen);

  return (
    <section>
      <TopContents />
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
    </section>
  );
}
