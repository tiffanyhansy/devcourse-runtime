import CheckboxListSecondary from "../../../components/Mui/List";

export default function OnlineList() {
  return (
    <>
      <article className="w-[22rem] shadow-xl rounded-[10px] mb-[24px]">
        <article className="w-full h-12 bg-[#F0F5F8] rounded-t-[10px] border-b flex items-center px-[15px]">
          <p className="text-lg font-bold">현재 활동 중</p>
        </article>
        <article className="h-[200px]">
          <CheckboxListSecondary />
        </article>
      </article>
    </>
  );
}
