import LayOut from "./routes/LayOut/LayOut";
import Main from "./routes/Main/Main";

export default function App() {
  return (
    <main className="px-[50px] roboto-medium">
      <LayOut />
      <Main />
    </main>
  );
}
