import LeftContents from "./LeftContents/LeftContents";
import RightContents from "./RightComponent/RightContents";
import CenterContents from "./CenterContents/CenterContents";
import { useHowTimeStore } from "../../store/store";
import Button from "../../components/common/Button";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import HowTimeModal from "../../components/howTime/HowTimeModal";
import { Favorite } from "@mui/icons-material";
import { styled } from "@mui/material";
import { useState } from "react";

interface Heart {
  id: number;
  style: React.CSSProperties;
}

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

  const [hearts, setHearts] = useState<Heart[]>([]);

  const handleNameClick = () => {
    const newHeart: Heart = {
      id: Date.now(),
      style: {
        position: "absolute",
        left: `${Math.random() * 100}%`, // 랜덤한 위치
        top: `${Math.random() * 90}%`, // 100%일 경우 화면이 밀리게 됨
        fontSize: "30px",
        color: "red",
        animation: "float 2s ease-in-out", // 애니메이션 적용
      },
    };
    setHearts((prevHearts) => [...prevHearts, newHeart]);

    setTimeout(() => {
      setHearts((prevHearts) =>
        prevHearts.filter((heart) => heart.id !== newHeart.id)
      );
    }, 2000); // 하트가 2초 후에 사라짐
  };

  return (
    <section style={{ position: "relative" }}>
      {/* 부모 요소에 relative 추가 */}
      <article className="flex items-end mt-32">
        <h1 className="text-[50px] text-[#3E435D] mr-5 select-none">
          <span className="font-bold" onClick={handleNameClick}>
            조명
          </span>
          님, 오늘도 열공하세요!!
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
      {/* 하트 아이콘들 */}
      {hearts.map((heart) => (
        <HeartStyle key={heart.id} style={heart.style}>
          <Favorite />
        </HeartStyle>
      ))}
    </section>
  );
}
