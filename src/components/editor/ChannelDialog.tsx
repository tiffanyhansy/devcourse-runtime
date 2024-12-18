import { Stack } from "@mui/material";
import Button from "../common/SquareButton";

interface ChannelDialogProps {
  onCancel: () => void;
  onMoveToBoard: () => void;
}

export default function ChannelDialog({
  onCancel,
  onMoveToBoard,
}: ChannelDialogProps) {
  return (
    <article className="absolute top-0 left-0 z-50 w-full h-full">
      <div className="w-[400px] h-[200px] bg-white border rounded-[10px] flex flex-col gap-[20px] items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        <Stack width="340px" direction="row" gap={2} justifyContent="center">
          <span className="text-2xl font-extrabold">
            정말 이동하시겠습니까?
          </span>
        </Stack>
        <Stack direction="row" gap={2}>
          <Button
            size="md"
            textSize="sm"
            variant="todo"
            onClick={onCancel} // 취소 버튼
          >
            취소
          </Button>
          <Button
            size="md"
            textSize="sm"
            variant="custom"
            onClick={onMoveToBoard} // 게시판으로 이동
          >
            게시판으로 이동
          </Button>
        </Stack>
      </div>
      <div
        className="z-40 w-full h-full bg-black bg-opacity-70"
        onClick={onCancel} // 배경 클릭 시 취소
      ></div>
    </article>
  );
}
