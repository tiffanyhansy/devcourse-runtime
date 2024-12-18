import NotiMain from "./NotiMain/NotiMain";
import NotiNav from "./NotiNav";

export default function Noti() {
  return (
    <article className="flex w-full mt-[150px] mb-20 justify-center items-center flex-col">
      <NotiNav />
      <NotiMain />
    </article>
  );
}
