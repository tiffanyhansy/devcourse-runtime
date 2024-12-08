import { useRef, useState } from "react";
import { useToDoStore } from "../../../../store/store";

export default function ToDoListItem({
  color,
  text,
  index,
}: {
  color?: string;
  text: string;
  index: number;
}) {
  const buttonRef = useRef<HTMLInputElement>(null);
  const [btnChecked, setBtnChecked] = useState<boolean>(false);
  const deleteToDoList = useToDoStore((state) => state.deleteToDoList);
  const ToDoList = useToDoStore((state) => state.ToDoList);
  return (
    <li className="w-full h-[50px] border-b border-[#D0E5F9] hover:bg-[#e9e9e9] px-[10px] flex items-center justify-between relative">
      <article className="items-center flex gap-[20px]">
        <input
          type="checkbox"
          ref={buttonRef}
          className={"w-[20px] h-[20px]"}
          onChange={() => {
            setBtnChecked(() => !btnChecked);
          }}
        />
        <span
          className={`font-medium`}
          style={{ color: `${btnChecked ? color : ""}` }}
        >
          {text}
        </span>
        {btnChecked ? (
          <article className="w-[80%] absolute left-[30px]">
            <img src="/public/line_through.svg" alt="빨간줄" />
          </article>
        ) : null}
      </article>
      <button
        className="w-[20px] h-[20px] block bg-black"
        onClick={() => {
          deleteToDoList(index);
          localStorage.setItem(
            "ToDoList",
            JSON.stringify(ToDoList.filter((_, i) => i !== index))
          );
        }}
      ></button>
    </li>
  );
}
