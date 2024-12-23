import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../common/SquareButton";
import { t } from "i18next";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
    >
      <DialogTitle
        id="confirm-dialog-title"
        sx={{
          fontFamily: "S-CoreDream-3Light",
          fontWeight: "bold",
          paddingBottom: "8px",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: "8px" }}>
        <DialogContentText sx={{ fontFamily: "S-CoreDream-3Light" }}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          size="md"
          textSize="sm"
          variant="todo"
          className="w-44 border-2 border-[#D6D6D6] border-solid text-gray-700 hover:bg-gray-100"
          onClick={onCancel}
        >
          {t("취소")}
        </Button>{" "}
        <Button
          size="md"
          textSize="sm"
          variant="custom"
          className="bg-[#E14444] hover:bg-[#e14444c0] w-44"
          onClick={() => {
            onConfirm();
          }}
        >
          {t("닫기")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
