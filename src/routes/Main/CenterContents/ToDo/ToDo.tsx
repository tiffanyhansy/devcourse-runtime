import Button from "../../../../components/common/SquareButton";
import { useToDoStore } from "../../../../store/store";
import Pin from "./Pin";
import ToDoListItem from "./ToDoListItem";
import ToDoEditor from "./ToDoEditor";
import { Tooltip } from "@mui/material";
import small_icon from "../../../../asset/images/small_icon.svg";

export default function ToDo() {
  // 메모장 핀 길이
  const PinLength = new Array(10).fill(0);
  // 기능
  const isShowEditor = useToDoStore((state) => state.isShowEditor);
  const toggleShowEditor = useToDoStore((state) => state.toggleShowEditor);
  const ToDoList = useToDoStore((store) => store.ToDoList);
  return (
    <>
      <article className="relative inline-block ToDo-shadow rounded-2xl">
        <article className="flex gap-[16px] px-[12px] pt-[10px] pb-[14px] bg-white rounded-t-2xl">
          {PinLength.map((_, i) => (
            <Pin key={i} />
          ))}
        </article>
        <article className="w-full h-[520px] bg-white overflow-y-scroll">
          <ul>
            {localStorage.getItem("ToDoList")
              ? ToDoList.map((ToDo, i) => (
                  <ToDoListItem
                    key={ToDo.id}
                    findid={ToDo.id}
                    text={ToDo.text}
                    ckeck={ToDo.checked}
                    color={"#666666"}
                    index={i}
                  />
                ))
              : null}
            {isShowEditor ? <ToDoEditor /> : null}
            {!isShowEditor ? (
              <li className="w-full h-[50px] border-b border-[#D0E5F9] hover:bg-[#e9e9e9]">
                <Button
                  size="lg" // 버튼 크기
                  variant="todo" // 사용자 정의 스타일
                  textSize="sm" // 텍스트 크기
                  className="flex items-center gap-[20px] w-full h-full pr-[12px] justify-start pl-6 hover:bg-[#e9e9e9]"
                  onClick={() => {
                    toggleShowEditor();
                  }}
                >
                  <img src={small_icon} alt={"추가 아이콘"} />
                  <span className="text-[#666666] font-medium ">
                    할 일 추가
                  </span>
                </Button>
              </li>
            ) : null}
          </ul>
        </article>
        <article className="w-full h-[30px] bg-white rounded-b-2xl"></article>
        <article className="w-[95%] h-[100px] bg-white absolute translate-x-[-50%] left-[50%] bottom-[-6px] z-[-1] rounded-b-xl ToDo-shadow"></article>
        <article className="w-[90%] h-[100px] bg-white absolute translate-x-[-50%] left-[50%] bottom-[-12px] z-[-2] rounded-b-xl ToDo-shadow"></article>
        <article className="w-[85%] h-[100px] bg-white absolute translate-x-[-50%] left-[50%] bottom-[-18px] z-[-3] rounded-b-xl ToDo-shadow"></article>
      </article>
    </>
  );
}
