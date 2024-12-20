import { t } from "i18next";

export default function HowTimeTop({
  changingHours,
}: {
  changingHours: string;
}) {
  return (
    <article className="flex gap-[10px] text-[2.5rem] font-bold">
      <span>{t("총")}</span>
      <span>{changingHours}</span>
      <span>{t("시간!!")}</span>
    </article>
  );
}
