import Button from "../../../../components/common/Button";

export default function ToDoListItem({
  lineThrough,
  color,
}: {
  lineThrough?: string;
  color?: string;
}) {
  return (
    <li className="w-full h-[50px] border-b border-[#D0E5F9]">
      <Button
        size="lg" // 버튼 크기
        variant="custom" // 커스텀 스타일
        textSize="md" // 텍스트 크기
        className={`flex items-center gap-[20px] w-full h-full px-[12px] ${lineThrough}`}
      >
        <input type="checkbox" />
        <span className={`font-medium ${color}`}>할 일 추가</span>
      </Button>
    </li>
  );
}
