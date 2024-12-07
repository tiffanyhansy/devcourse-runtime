type buttonProps = {
  icon: string;
  title: string;
};
export default function LinkButton(pops: buttonProps) {
  return (
    <>
      <button className="w-20 h-20 p-2 bg-[#7eacb5] rounded-[100px]  flex flex-col gap-[6px] items-center justify-center mt-[30px] shadow-lg">
        <img src={pops.icon} alt={"게시판 버튼 로고"} />
        <p className="text-[0.5rem] font-semibold text-white">{pops.title}</p>
      </button>
    </>
  );
}
