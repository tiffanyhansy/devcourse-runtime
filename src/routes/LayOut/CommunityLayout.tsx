import { Outlet } from "react-router";
import Header from "./Header";
import SelectLanguageButton from "../../components/locales/SelectLanguageButton";
export default function CommunityLayout() {
  return (
    <main className="relative px-[50px] mx-auto s-core-dream-light max-w-[1440px] h-screen select-none ">
      <Header />
      <Outlet />
      <SelectLanguageButton />
    </main>
  );
}
