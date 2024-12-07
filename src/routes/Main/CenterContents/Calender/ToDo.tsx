import Pin from "./Pin";
import ToDoListItem from "./ToDoListItem";

export default function ToDo() {
  const length = new Array(10).fill(0);
  return (
    <article className="inline-block ToDo-shadow rounded-2xl relative">
      <article className="flex gap-[16px] px-[12px] pt-[10px] pb-[14px] bg-white rounded-t-2xl">
        {length.map((_, i) => (
          <Pin key={i} />
        ))}
      </article>
      <article className="w-full h-[500px] bg-white overflow-y-scroll">
        <ul>
          <ToDoListItem lineThrough={"line-through"} color={"#666666"} />
          <ToDoListItem />
          <li className="w-full h-[50px] border-b border-[#D0E5F9]">
            <button className="flex items-center gap-[20px] w-full h-full px-[12px]">
              <input type="checkbox" />
              <span className="font-medium w-[300px] flex overflow-ellipsis overflow-hidden text-nowrap">
                할 일 추가
              </span>
            </button>
          </li>
          <li className="w-full h-[50px] border-b border-[#D0E5F9]">
            <button className="flex items-center gap-[20px] w-full h-full px-[12px]">
              <input type="checkbox" />
              <span className="font-medium text-[#666666]">할 일 추가</span>
            </button>
          </li>
          <li className="w-full h-[50px] border-b border-[#D0E5F9]">
            <button className="flex items-center gap-[20px] w-full h-full px-[12px]">
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
  );
}
