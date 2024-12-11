import LeftContents from "./LeftContents/LeftContents";
import RightContents from "./RightComponent/RightContents";
import CenterContents from "./CenterContents/CenterContents";
import { useEasterEgg, useHowTimeStore } from "../../store/store";
import HowTimeModal from "../../components/howTime/HowTimeModal";
import TopContents from "./TopContents/TopContents";
import { Favorite } from "@mui/icons-material";
import { styled } from "@mui/material";

const HeartStyle = styled("div")`
  @keyframes float {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: translateY(-20px) scale(1.2);
      opacity: 0.8;
    }
    100% {
      transform: translateY(-40px) scale(1.5);
      opacity: 0;
    }
  }
`;

export default function Main() {
  const isHowTimeOpen = useHowTimeStore((state) => state.isHowTimeOpen);
  const hearts = useEasterEgg((state) => state.hearts);

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
      {/* 하트 아이콘들 */}
      {hearts.map((heart) => (
        <HeartStyle key={heart.id} style={heart.style}>
          <Favorite />
        </HeartStyle>
      ))}
    </section>
  );
}
