import { t } from "i18next";
import CheckboxListSecondary from "../../../components/Mui/List";

export default function OnlineList() {
  return (
    <>
      <article className="w-[25rem] rounded-[30px] mb-[24px] bg-[#F0F5F8]">
        <article className="w-full h-12 flex items-center pl-7 pt-5">
          <p className="text-lg font-bold">{t("현재 활동 중")}</p>
        </article>
        <article className="h-[200px]">
          <CheckboxListSecondary />
        </article>
      </article>
    </>
  );
}
