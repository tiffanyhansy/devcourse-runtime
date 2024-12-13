import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../css/QuillCustom.css";
import { useEditorStore } from "../../store/store";
import { usePostStore } from "../../store/postStore"; // postStore 임포트
import ConfirmDialog from "./ConfirmDialog";
import Button from "../common/SquareButton";
import { Stack, Chip, Tooltip } from "@mui/material";
import { useProfileStore } from "../../store/store";

export default function BlogEditor() {
  const {
    content,
    title,
    isDialogOpen,
    toggleEditor,
    setContent,
    setTitle,
    toggleDialog,
    resetEditor,
  } = useEditorStore();

  const { post, isLoading, error, image, channelId } = usePostStore();

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || content.trim() === "<p><br></p>") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    await post(title, content, image, channelId); // POST 요청 실행
    resetEditor(); // 에디터 초기화
    toggleEditor(); // 에디터 닫기
  };

  const handleCancel = () => {
    if ((content.trim() && content.trim() !== "<p><br></p>") || title.trim()) {
      toggleDialog(true); // ConfirmDialog 열기
    } else {
      resetEditor();
      toggleEditor(); // 내용이 없으면 바로 닫기
    }
  };

  const confirmClose = () => {
    toggleDialog(false);
    resetEditor();
    toggleEditor();
  };

  const cancelClose = () => {
    toggleDialog(false);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "color",
    "list",
    "link",
    "image",
  ];
  const {
    isEditable,

    tempClickedField,

    setTempClickedField,
  } = useProfileStore();

  const fieldLabels = ["SW", "SI", "DA", "GE"];
  const fieldDescriptions = [
    "소프트웨어 개발",
    "시스템/인프라",
    "데이터/AI 개발",
    "게임/QA",
  ];
  const handleFieldClick = (index: number) => {
    const updatedField = new Set(tempClickedField);
    if (updatedField.has(index)) {
      updatedField.delete(index);
    } else {
      updatedField.add(index);
    }
    setTempClickedField(updatedField);
  };

  return (
    <div className="relative flex flex-col text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-black pl-3">(optional)</h1>
        <div className="flex gap-2 pt-1">
          <Button
            variant="primary"
            size="xs"
            textSize="sm"
            className="font-normal hover:bg-[#96ccd6]"
            onClick={handleSave}
            disabled={isLoading} // 로딩 중이면 비활성화
          >
            {isLoading ? "저장 중..." : "저장하기"}
          </Button>
          <Button
            onClick={handleCancel}
            variant="secondary"
            size="closeEditor"
            className="font-normal transition hover:bg-[#C96868] hover:text-white"
            textSize="sm"
          >
            ✕
          </Button>
        </div>
      </div>

      <div className="flex flex-col flex-grow pb-10 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요..."
          className="w-full pb-2 pl-3 text-3xl font-semibold text-black placeholder-gray-600 bg-transparent border-b border-white/30 focus:outline-none"
        />
        <Stack
          direction="column"
          spacing={1}
          sx={{ position: "relative", top: "-20px", right: "-10px" }}
        >
          <label
            style={{
              fontSize: "20px",
            }}
          >
            Field
          </label>
          <Stack direction="row" spacing={1}>
            {fieldLabels.map((label, index) => (
              <Tooltip key={index} title={fieldDescriptions[index]} arrow>
                <Chip
                  key={index}
                  label={label}
                  variant="filled"
                  onClick={
                    isEditable ? () => handleFieldClick(index) : undefined
                  }
                  style={{
                    width: "3rem",
                    backgroundColor: tempClickedField.has(index)
                      ? isEditable
                        ? "#7EACB5"
                        : "#B0B0B0"
                      : "",
                    color: tempClickedField.has(index)
                      ? "white"
                      : isEditable
                      ? "#000"
                      : "",
                    cursor: isEditable ? "pointer" : "not-allowed",
                    opacity: isEditable ? 1 : 0.6,
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        </Stack>

        <div className="flex-grow">
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="여기에 내용을 입력하세요..."
            theme="snow"
          />
        </div>
      </div>

      {error && <p className="text-red-500">저장 중 오류 발생: {error}</p>}
      <ConfirmDialog
        open={isDialogOpen}
        title="에디터 닫기"
        description="작성 중인 내용이 있습니다. 정말로 닫으시겠습니까?"
        onConfirm={confirmClose}
        onCancel={cancelClose}
      />
    </div>
  );
}
