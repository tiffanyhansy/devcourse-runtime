import { useTimerPlayStore } from "../../../../store/store";

export default function Timer() {
  const { isPlayBtnClicked } = useTimerPlayStore();
  return (
    <>
      <article
        className={`timer-shadow flex items-center justify-center w-[25rem] h-[25rem] rounded-full bg-[#F0F5F8] mb-5 transition-colors duration-200`}
        style={{
          backgroundColor: `${isPlayBtnClicked ? "#778899" : ""}`,
          color: `${isPlayBtnClicked ? "#ffffff" : ""}`,
        }}
      >
        <article className="flex gap-1 text-5xl">
          <span>40</span>
          <span>:</span>
          <span>00</span>
          <span>:</span>
          <span>00</span>
        </article>
      </article>
    </>
  );
}
