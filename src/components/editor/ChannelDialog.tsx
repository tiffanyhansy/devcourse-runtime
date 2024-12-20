import { Stack } from "@mui/material";
import Button from "../common/SquareButton";
import { useNavigate } from "react-router";
import { useEditorStore } from "../../store/store";
import { t } from "i18next";

interface ChannelDialogProps {
  onCancel: () => void;
  onMoveToBoard: () => void;
  closeChannelDialog?: () => void;
}

// const { closeChannelDialog } = useEditorStore();

export default function ChannelDialog({ onCancel }: ChannelDialogProps) {
  const navigate = useNavigate(); // useNavigate 호출

  return (
    <article className="absolute top-0 left-0 z-50 w-full h-full">
      <div className="w-[400px] h-[200px] bg-white border rounded-[10px] flex flex-col gap-[20px] items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        <Stack width="340px" direction="row" gap={2} justifyContent="center">
          <span className="text-2xl font-extrabold">
            {t("게시글을 확인하시겠습니까?")}
          </span>
        </Stack>
        <Stack direction="row" gap={2}>
          <Button
            size="md"
            textSize="sm"
            variant="todo"
            className="bg-[#C96868] text-white"
            onClick={onCancel}
          >
            {t("닫기")}
          </Button>
          <Button
            size="md"
            textSize="sm"
            variant="custom"
            onClick={() => navigate("/community")}
          >
            {t("게시판")}
          </Button>
        </Stack>
      </div>
      <div
        className="z-40 w-full h-full bg-black bg-opacity-70"
        onClick={onCancel}
      ></div>
    </article>
  );
}
