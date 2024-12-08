import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // react-router-dom 추가
import Header from "./routes/LayOut/Header";
import Main from "./routes/Main/Main";
import Mypage from "./routes/Mypage/Mypage";
import EditorModal from "./components/editor/EditorModal";
import BlogEditor from "./components/editor/BlogEditor";
import useEditorStore from "./store/store";


export default function App() {
  const { isEditorOpen, toggleEditor, saveContent } = useEditorStore();

  return (
    <Router>
      <main className="px-[50px] mx-auto roboto-medium max-w-[1440px]">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </main>
    </Router>
  );
}
