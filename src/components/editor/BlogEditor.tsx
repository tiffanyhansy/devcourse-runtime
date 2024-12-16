import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../css/QuillCustom.css";
import { useEditorStore } from "../../store/store";
import { usePostStore } from "../../store/postStore"; // postStore 임포트
import ConfirmDialog from "./ConfirmDialog";
import Button from "../common/SquareButton";
import { Stack, Chip, Tooltip } from "@mui/material";
import { useEffect } from "react";

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
    isShake,
    setShake,
    errorMessage,
    setErrorMessage,
    resetShakeAndError,
  } = useEditorStore();

  const {
    channels,
    fetchChannels,
    setSelectedChannelId,
    post,
    isLoading,
    channelId,
  } = usePostStore();

  useEffect(() => {
    fetchChannels(); // 컴포넌트가 마운트될 때 채널 리스트 가져오기
  }, [fetchChannels]);

  const handleError = (message: string) => {
    setShake(true);
    setErrorMessage(message);
    setTimeout(resetShakeAndError, 2000); // 2초 후 상태 초기화
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || content.trim() === "<p><br></p>") {
      handleError("제목과 내용을 모두 입력해주세요");
      return;
    }

    // HTML 태그 제거 함수
    const removeHtml = (html: string) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || ""; // 태그 제거 후 순수 텍스트 반환
    };

    //content 적용시키기
    const removePtags = removeHtml(content);

    const success = await post(title, removePtags, channelId || "");

    if (success) {
      resetEditor();
      toggleEditor();
    } else {
      handleError("저장에 실패했습니다.");
    }
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
  return (
    <div
      className={`relative flex flex-col text-white ${
        isShake ? "animate-shake" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-black pl-3">(optional)</h1>
        <div className="flex gap-2 pt-1">
          <div className="pt-2">
            {errorMessage && <p className="text-[#C96868]">{errorMessage}</p>}
          </div>
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
        {/* Stack 채널 선택 */}
        <Stack
          direction="column"
          spacing={1}
          sx={{ position: "relative", top: "-10px", right: "-10px" }}
        >
          <label
            style={{
              fontSize: "20px",
            }}
          ></label>
          <Stack direction="row" spacing={1}>
            {channels.map((channel) => (
              <Tooltip key={channel._id} title={channel.description} arrow>
                <Chip
                  key={channel._id}
                  label={channel.name} // 채널 이름 표시
                  variant="filled"
                  onClick={() => setSelectedChannelId(channel._id)} // 선택된 채널 ID 저장
                  style={{
                    width: "3rem",
                    backgroundColor:
                      channel._id === channelId ? "#7EACB5" : "#f0f0f0", // 선택된 채널 색상 변경
                    color: channel._id === channelId ? "white" : "black",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        </Stack>

        {/* 에디터 & 본문 */}
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
