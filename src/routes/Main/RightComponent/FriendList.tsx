import CheckboxListSecondary from "../../../components/Mui/List";

export default function FriendList() {
  return (
    <>
      <article className="w-[22rem] shadow-lg border border-[#D6D6D6] rounded-[10px] mb-[10px]">
        <article className="w-full h-8 bg-[#F6F6F6] rounded-t-[10px] border-b flex items-center px-[15px]">
          <span className="text-sm font-bold">친구목록</span>
        </article>
        <article>
          <CheckboxListSecondary />
        </article>
        <article className="w-full h-2 bg-[#F6F6F6] block rounded-b-[10px] border-t"></article>
      </article>
    </>
  );
}
