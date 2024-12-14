import LeftContents from "./LeftContents/LeftContents";
import RightContents from "./RightComponent/RightContents";
import CenterContents from "./CenterContents/CenterContents";
import {
  useEasterEgg,
  useHowTimeStore,
  useTimerStore,
  useFriendModalStore,
} from "../../store/store";
import HowTimeModal from "../../components/howTime/HowTimeModal";
import TopContents from "./TopContents/TopContents";
import { Favorite } from "@mui/icons-material";
import { styled } from "@mui/material";
import FriendManageModal from "../../components/Modal/FriendManageModal";
import { useEffect } from "react";
import { useLoginStore } from "../../store/API";

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
  const isAchieve = useTimerStore((state) => state.isAchieve);
  const trophyModalViewed = useTimerStore((state) => state.trophyModalViewed);
  const setTrophyModalViewed = useTimerStore(
    (state) => state.setTrophyModalViewed
  );
  const modal = useFriendModalStore((s) => s.modal);

  return (
    <section>
      <TopContents />
      {/* 컨텐츠 */}
      <section className="mt-[60px] flex justify-between pb-[100px]">
        {/* 좌측 컨텐츠 */}
        <LeftContents />
        {/* 중앙 컨텐츠 */}
        <CenterContents />
        {/* 우측 컨텐츠 */}
        <RightContents />
      </section>
      {isHowTimeOpen ? <HowTimeModal /> : null}
      {modal ? <FriendManageModal /> : null}
      {/* 하트 아이콘들 */}
      {hearts.map((heart) => (
        <HeartStyle key={heart.id} style={heart.style}>
          <Favorite />
        </HeartStyle>
      ))}
      {/* 임시 로그아웃 기능 */}
      {/* <button
        onClick={() => {
          axiosInstance.post(`/logout`).then((res) => console.log(res));
        }}
      >
        로그아웃
      </button> */}
      {/* 트로피 모달 프로토타입입니당 */}
      {isAchieve && !trophyModalViewed ? (
        <article className="absolute top-0 left-0 z-50 w-screen h-screen overflow-hidden animate-show">
          <article className="animate-spaceInDown_1s absolute top-[50%] left-[50%] opacity-0 w-[500px] h-[500px] block">
            <img src="./src/asset/images/trophy.svg" alt="트로피 이미지" />
          </article>
          <article className="absolute bottom-[10%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <h2 className="text-4xl font-bold text-white">
              오늘의 목표시간을 달성했어요!
            </h2>
            <article>
              <button className="px-[30px] py-[10px] bg-white">
                글 작성 하러가기
              </button>
              <button
                className="px-[30px] py-[10px] bg-white"
                onClick={setTrophyModalViewed}
              >
                닫기
              </button>
            </article>
          </article>
        </article>
      ) : null}
    </section>
  );
}
