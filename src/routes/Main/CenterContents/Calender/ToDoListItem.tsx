import { useRef, useState } from "react";
import { useToDoStore } from "../../../../store/store";
import { DeleteOutline, DeleteRounded } from "@mui/icons-material";

export default function ToDoListItem({
  findid,
  color,
  text,
  index,
  ckeck,
}: {
  findid: string;
  color?: string;
  text: string;
  index: number;
  ckeck: boolean;
}) {
  const deleteToDoList = useToDoStore((state) => state.deleteToDoList);
  const ToDoList = useToDoStore((state) => state.ToDoList);
  const updateToDoListCheck = useToDoStore(
    (state) => state.updateToDoListCheck
  );
  const clickedIndex = useToDoStore((state) => state.clickedIndex);
  const [isDeleteIconHovered, setIsDeleteIconHovered] = useState(false);

  return (
    <li className="w-100% h-[50px] border-b border-[#D0E5F9] hover:bg-[#e9e9e9] pl-[20px] px-[10px] flex items-center justify-between relative">
      <article className="self-center flex gap-[18px]">
        <input
          type="checkbox"
          className={"w-[20px] h-[20px]"}
          checked={ckeck}
          onChange={() => {
            // 체크시 로컬저장소랑 전역변수 체크상태 업데이트
            const newToDoList = ToDoList.map((e) => {
              if (e.id === findid) {
                return { text: e.text, id: e.id, checked: !e.checked };
              }
              return e;
            });
            updateToDoListCheck(newToDoList);
            localStorage.setItem("ToDoList", JSON.stringify(newToDoList));
          }}
        />
        <span
          className={`font-medium`}
          style={{ color: `${ckeck ? color : ""}` }}
        >
          {text}
        </span>
        {ckeck ? (
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
          <DeleteRounded sx={{ color: "#C96868" }} />
        ) : (
          <DeleteOutline sx={{ color: "#C96868" }} />
        )}
      </button>
    </li>
  );
}
