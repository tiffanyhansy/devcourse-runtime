export default function LinkButton() {
  return (
    <>
      <button className="w-24 h-24 border border-[#7EACB5] rounded-full flex flex-col gap-[6px] items-center justify-center mt-[30px] bg-white shadow-lg">
        <img src={"/notice_icon.svg"} alt={"게시판 버튼 로고"} />
        <p className="text-[0.5rem] font-semibold">{"글 작성"}</p>
      </button>
    </>
  );
}
