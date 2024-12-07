export default function ToDoListItem({
  lineThrough,
  color,
}: {
  lineThrough?: string;
  color?: string;
}) {
  return (
    <li className="w-full h-[50px] border-b border-[#D0E5F9]">
      <button
        className={`flex items-center gap-[20px] w-full h-full px-[12px] ${lineThrough}`}
      >
        <input type="checkbox" />
        <span className={`font-medium ${color}`}>할 일 추가</span>
      </button>
    </li>
  );
}
