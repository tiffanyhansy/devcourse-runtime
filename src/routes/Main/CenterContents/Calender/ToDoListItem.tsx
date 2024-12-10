import { useRef, useState } from "react";
import { useToDoStore } from "../../../../store/store";
import { DeleteOutline, DeleteRounded } from "@mui/icons-material";

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
  const clickedIndex = useToDoStore((state) => state.clickedIndex);
  const [isDeleteIconHovered, setIsDeleteIconHovered] = useState(false);

  return (
    <li className="w-100% h-[50px] border-b border-[#D0E5F9] hover:bg-[#e9e9e9] pl-[20px] px-[10px] flex items-center justify-between relative">
      <article className="self-center flex gap-[18px]">
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
          <article className="w-[80%] absolute left-[40px] self-center">
            <img src="/src/asset/images/line_through.svg" alt="빨간줄" />
          </article>
        ) : null}
      </article>

      <button
        onClick={() => {
          deleteToDoList(index);
          localStorage.setItem(
            "ToDoList",
            JSON.stringify(ToDoList.filter((_, i) => i !== index))
          );
        }}
        onMouseEnter={() => setIsDeleteIconHovered(true)}
        onMouseLeave={() => setIsDeleteIconHovered(false)}
      >
        {clickedIndex === index || isDeleteIconHovered ? (
          <DeleteRounded />
        ) : (
          <DeleteOutline />
        )}
      </button>
    </li>
  );
}
