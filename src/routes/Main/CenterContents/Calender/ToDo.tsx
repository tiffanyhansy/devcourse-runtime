import { useEffect, useRef } from "react";
import { useToDoStore } from "../../../../store/store";
import Pin from "./Pin";
import ToDoListItem from "./ToDoListItem";
import ToDoEditor from "./ToDoEditor";
import { v4 as uuidv4 } from "uuid";

export default function ToDo() {
  // 메모장 핀 길이
  const PinLength = new Array(10).fill(0);
  // 기능
  const isShowEditor = useToDoStore((state) => state.isShowEditor);
  const toggleShowEditor = useToDoStore((state) => state.toggleShowEditor);
  const ToDoList = useToDoStore((store) => store.ToDoList);
  return (
    <>
      <article className="inline-block ToDo-shadow rounded-2xl relative">
        <article className="flex gap-[16px] px-[12px] pt-[10px] pb-[14px] bg-white rounded-t-2xl">
          {PinLength.map((_, i) => (
            <Pin key={i} />
          ))}
        </article>
        <article className="w-full h-[500px] bg-white overflow-y-scroll">
          <ul>
            {localStorage.getItem("ToDoList")
              ? ToDoList.map((ToDo, i) => (
                  <ToDoListItem
                    key={ToDo.id}
                    text={ToDo.text}
                    color={"#666666"}
                    lineThrough={"lineThrough"}
                    index={i}
                  />
                ))
              : null}
            {isShowEditor ? <ToDoEditor /> : null}
            <li className="w-full h-[50px] border-b border-[#D0E5F9] hover:bg-[#e9e9e9]">
              <button
                className="flex items-center gap-[20px] w-full h-full px-[12px]"
                onClick={() => {
                  toggleShowEditor();
                }}
              >
                <img src={"/public/small_icon.svg"} alt={"추가 아이콘"} />
                <span className="text-[#666666] font-medium">할 일 추가</span>
              </button>
            </li>
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
