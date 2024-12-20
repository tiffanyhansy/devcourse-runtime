import { t } from "i18next";
export default function HowTimeHeader() {
  return (
    <article className="flex items-center w-full h-[72px] px-[30px] bg-[#7EACB5] rounded-t-[10px] text-2xl text-white drop-shadow-lg">
      <span className="font-bold">{"조명"}</span>
      <span>{t("님의 오늘 공부 시간은?")}</span>
    </article>
  );
}
