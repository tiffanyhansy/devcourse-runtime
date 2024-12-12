import CheckboxListSecondary from "../../../components/Mui/List";

export default function FriendList() {
  return (
    <>
      <article className="w-[22rem] shadow-xl rounded-[10px] mb-[24px]">
        <article className="w-full h-12 bg-[#F0F5F8] rounded-t-[10px] border-b flex items-center px-[15px]">
          <p className="text-lg font-bold">친구 목록</p>
        </article>
        <article>
          <CheckboxListSecondary />
        </article>
      </article>
    </>
  );
}
