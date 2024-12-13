import { Outlet } from "react-router";
import Header from "./Header";

export default function LayOut() {
  return (
    <main className="px-[50px] mx-auto s-core-dream-light max-w-[1440px] h-screen select-none overflow-hidden">
      <Header />
      <Outlet />
    </main>
  );
}
