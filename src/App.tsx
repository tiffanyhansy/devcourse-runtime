import { Route, Routes } from "react-router";
import { useEffect } from "react";
import Main from "./routes/Main/Main";
import Login from "./routes/Login/Login";
import Join from "./routes/Join/Join";
import Noti from "./routes/Notifications/Noti";
import JoinSuccess from "./routes/Join/JoinSuccess";
import ErrorPage from "./components/404Page/ErrorPage";
import UserPage from "./routes/UserPage/UserPage";
import Mypage from "./routes/Mypage/Mypage";
import LayOut from "./routes/LayOut/LayOut";
import Community from "./routes/Community/Community";
import CommunityLayout from "./routes/LayOut/CommunityLayout";

export default function App() {
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
    if (!localStorage.getItem("LoginUserInfo")) {
      localStorage.setItem("LoginUserInfo", JSON.stringify(null));
    }
    if (!localStorage.getItem("LoginUserToken")) {
      localStorage.setItem("LoginUserToken", JSON.stringify(null));
    }
  }, []);

  return (
    <Routes>
      <Route element={<LayOut />}>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/" element={<Main />} />
        <Route path="/join-success" element={<JoinSuccess />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/userpage/:fullname" element={<UserPage />} />
        <Route path="/notifications" element={<Noti />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route element={<CommunityLayout />}>
        <Route path="/community" element={<Community />} />
        <Route path="/community/sw" element={<Community channelName="sw" />} />
        <Route path="/community/si" element={<Community channelName="si" />} />
        <Route path="/community/da" element={<Community channelName="da" />} />
        <Route path="/community/ge" element={<Community channelName="ge" />} />
      </Route>
    </Routes>
  );
}
