import { Outlet } from "react-router";
import Header from "./Header";

export default function CommunityLayout() {
  return (
    <main className="relative px-[50px] mx-auto s-core-dream-light max-w-[1440px] h-screen select-none overflow-y-auto custom-scroll">
      <Header />
      <Outlet />
    </main>
  );
}
