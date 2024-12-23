// import { t } from "i18next";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import Button from "../common/SquareButton";

type DeleteDialogProps = {
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteDialog({ onClose, onDelete }: DeleteDialogProps) {
  return (
    <Dialog
      open
      onClose={(event: React.MouseEvent) => {
        event.stopPropagation(); // 이벤트 버블링 방지
        onClose();
      }}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "10px",
          padding: "20px",
          alignItems: "center",
          fontFamily: "S-CoreDream-3Light",
        },
      }}
    >
      <DialogTitle id="delete-dialog-title">
        정말로 삭제하시겠습니까?
      </DialogTitle>
      <DialogActions>
        {/* 닫기 버튼 */}
        <Button
          size="md"
          textSize="sm"
          variant="todo"
          className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={(event) => {
            event.stopPropagation(); // 이벤트 버블링 방지
            onClose();
          }}
        >
          닫기
        </Button>
        {/* 삭제 버튼 */}
        <Button
          size="md"
          textSize="sm"
          variant="custom"
          className=" hover:bg-[#C96868] text-white"
          onClick={(event) => {
            event.stopPropagation(); // 이벤트 버블링 방지
            onDelete();
          }}
        >
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
