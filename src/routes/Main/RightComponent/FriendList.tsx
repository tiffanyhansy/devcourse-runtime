import CheckboxListSecondary from "../../../components/Mui/List";

export default function FriendList() {
  return (
    <>
      <article className="w-[22rem] shadow-lg border border-[#D6D6D6] rounded-[10px] mb-[24px]">
        <article className="w-full h-12 bg-[#F6F6F6] rounded-t-[10px] border-b flex items-center px-[15px]">
          <span className="text-lg font-bold">친구 목록</span>
        </article>
        <article>
          <CheckboxListSecondary />
        </article>
        <article className="w-full h-2 bg-[#F6F6F6] block rounded-b-[10px] border-t"></article>
      </article>
    </>
  );
}
