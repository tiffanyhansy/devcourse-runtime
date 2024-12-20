import NotiMain from "./NotiMain/NotiMain";
import NotiNav from "./NotiNav";
import { useTranslation } from "react-i18next";
import SelectLanguageButton from "../../components/locales/SelectLanguageButton";

export default function Noti() {
  const { t } = useTranslation();

  return (
    <>
      <article className="flex w-full mt-[150px] mb-20 justify-center items-center flex-col">
        <NotiNav />
        <NotiMain />
      </article>
      <SelectLanguageButton />
    </>
  );
}
