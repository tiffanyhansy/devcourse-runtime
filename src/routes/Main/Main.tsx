import LeftContents from "./LeftContents/LeftContents";
import RightContents from "./RightComponent/RightContents";
import CenterContents from "./CenterContents/CenterContents";

export default function Main() {
  return (
    <section>
      <article className="flex mt-32">
        <h1 className="text-[50px] text-[#3E435D] mr-5">
          <span className="font-bold">조명💡</span> 님, 오늘도 열공하세요!!
        </h1>
        <button className="text-[#7EACB5] text-2xl">
          {"오늘의 목표 설정하기 >"}
        </button>
      </article>
      {/* 컨텐츠 */}
      <section className="mt-[100px] flex justify-between">
        {/* 좌측 컨텐츠 */}
        <LeftContents />
        {/* 중앙 컨텐츠 */}
        <CenterContents />
        {/* 우측 컨텐츠 */}
        <RightContents />
      </section>
    </section>
  );
}
