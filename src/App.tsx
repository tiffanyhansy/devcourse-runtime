import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // react-router-dom 추가
import Header from "./routes/LayOut/Header";
import Main from "./routes/Main/Main";
import Mypage from "./routes/Mypage/Mypage"; // 마이페이지 컴포넌트 import

export default function App() {
  return (
    <Router>
      <main className="px-[50px] roboto-medium">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </main>
    </Router>
  );
}
