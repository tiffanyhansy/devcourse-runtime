import { useRef, useState } from "react";
import { useToDoStore } from "../../../../store/store";
import { DeleteOutline, DeleteRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

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
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Tooltip placement="right" arrow title={text}>
      <li className="w-100% h-[50px] border-b border-[#D0E5F9] hover:bg-[#e9e9e9] pl-[20px] px-[10px] flex items-center justify-between relative">
        <article className="self-center flex gap-[18px]">
          <input
            ref={inputRef}
            type="checkbox"
            className={
              "appearance-none w-[20px] h-[20px] border border-[#d9d9d9] rounded-[5px]]"
            }
            checked={ckeck}
            onChange={() => {
              // 체크시 로컬저장소랑 전역변수 체크상태 업데이트
              const newToDoList = ToDoList.map((e) => {
                // 리스트의 uuid와 일치하는 요소를 찾아 checked상태를 변경
                if (e.id === findid) {
                  return { text: e.text, id: e.id, checked: !e.checked };
                }
                return e;
              });
              // 전역변수, 로컬저장소에 변경내용 저장
              updateToDoListCheck(newToDoList);
              localStorage.setItem("ToDoList", JSON.stringify(newToDoList));
            }}
          />
          {ckeck ? (
            <article
              className="absolute top-[10px] left-[23px]"
              onClick={() => {
                // 체크 아이콘을 클릭하면 ref객체를 통해 체크박스가 클릭되도록 유도
                inputRef.current?.click();
              }}
            >
              <img src="/src/asset/images/check_icon.svg" alt="체크 아이콘" />
            </article>
          ) : null}
          <span
            className={`font-medium w-[280px] truncate`}
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
    </Tooltip>
  );
}
