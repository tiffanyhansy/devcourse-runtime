import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Header from "./routes/LayOut/Header";
import Main from "./routes/Main/Main";
import Login from "./routes/Login/Login";
import Join from "./routes/Join/Join";
import Noti from "./components/notifications/Noti";
import JoinSuccess from "./routes/Join/JoinSuccess";
import ErrorPage from "./components/404Page/ErrorPage";
import UserPage from "./routes/UserPage/UserPage";
import Mypage from "./routes/Mypage/Mypage";

export default function App() {
  //
  useEffect(() => {
    if (!localStorage.getItem("ToDoList")) {
      localStorage.setItem("ToDoList", "[]");
    }
    if (!localStorage.getItem("TimerTime")) {
      localStorage.setItem("TimerTime", JSON.stringify([0, 0, 0]));
    }
    if (!localStorage.getItem("StaticTimerTime")) {
      localStorage.setItem(
        "StaticTimerTime",
        JSON.stringify(["00", "00", "00"])
      );
    }
  }, []);
  return (
    <Router>
      <main className="px-[50px] mx-auto s-core-dream-light max-w-[1440px] h-screen select-none overflow-hidden">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/" element={<Main />} />
          <Route path="/join-success" element={<JoinSuccess />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/userpage/:username" element={<UserPage />} />
          <Route path="/notifications" element={<Noti />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </Router>
  );
}
