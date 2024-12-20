import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../../css/QuillCustom.css";
import { useEditorStore } from "../../store/store";
import { usePostStore } from "../../store/postStore"; // postStore 임포트
import { useEffect, useRef } from "react";
import { Stack, Chip, Tooltip } from "@mui/material";
import Button from "../common/SquareButton";
import CircularProgress from "@mui/material/CircularProgress";
import { t } from "i18next";

export default function BlogEditor() {
  const {
    content,
    title,
    toggleEditor,
    setContent,
    setTitle,
    resetEditor,
    setShake,
    errorMessage,
    setErrorMessage,
    resetShakeAndError,
    handleCancel,
    openChannelDialog,
  } = useEditorStore();

  const {
    channels,
    fetchChannels,
    setSelectedChannelId,
    post,
    error,
    isLoading,
    channelId,
    setImage,
    image,
  } = usePostStore();

  // 컴포넌트가 마운트될 때 채널 리스트 가져오기
  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const handleError = (message: string) => {
    setShake(true);
    setErrorMessage(message);
    setTimeout(resetShakeAndError, 1000);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || content.trim() === "<p><br></p>") {
      handleError("제목과 내용을 모두 입력해주세요");
      return;
    }

    // HTML 태그 제거, 순수 텍스트 변환
    const removeHtml = (html: string) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };

    //content에 적용
    const removePtags = removeHtml(content);

    //post전송 이후의 로직 정리
    try {
      await post(title, removePtags, channelId || "", image);

      resetEditor();
      setImage(null);
      toggleEditor();
      setTimeout(() => {
        openChannelDialog(); // 에디터 닫힌 뒤 ChannelDialog 표시
      }, 0);
    } catch (error) {
      handleError("저장에 실패했습니다.");
    }
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

  //quillRef api호출
  const quillRef = useRef<ReactQuill>(null);

  //ReactQuill의 DOM을 직접 제어하기
  useEffect(() => {
    const editorElement = quillRef.current?.getEditor().root;

    if (editorElement) {
      // 텍스트 입력을 시작하면 placeholder 제거
      const handleCompositionStart = () => {
        editorElement.classList.remove("ql-blank");
      };
      // 입력이 끝난 후 에디터 내용 확인
      const handleCompositionEnd = () => {
        if (!editorElement.innerText.trim()) {
          editorElement.classList.add("ql-blank");
        }
      };
      //이벤트 리스너로 함수실행
      editorElement.addEventListener(
        "compositionstart",
        handleCompositionStart
      );
      editorElement.addEventListener("compositionend", handleCompositionEnd);
      //메모리 누수 방지
      return () => {
        editorElement.removeEventListener(
          "compositionstart",
          handleCompositionStart
        );
        editorElement.removeEventListener(
          "compositionend",
          handleCompositionEnd
        );
      };
    }
  }, []);

  const currentErrorMessage = error || errorMessage;

  return (
    <div className={`relative flex flex-col text-white`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="pl-3 text-xl font-bold text-black">(optional)</h1>
        <div className="flex gap-2 pt-1">
          <div className="pt-2">
            {currentErrorMessage && (
              <p className="text-[#C96868]">{currentErrorMessage}</p>
            )}
          </div>
          <Button
            variant="primary"
            size="xs"
            textSize="sm"
            className="font-normal hover:bg-[#96ccd6]"
            onClick={handleSave}
            disabled={isLoading} // 로딩 중이면 비활성화
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              t("저장하기")
            )}
          </Button>
          <Button
            onClick={() => handleCancel(setImage)}
            variant="custom"
            size="md"
            className="font-normal transition bg-[#D6D6D6] hover:bg-[#C96868] w-[40px] h-[40px]"
            textSize="sm"
          >
            ✕
          </Button>
        </div>
      </div>

      <div className="flex flex-col flex-grow pb-10 space-y-3">
        <form onSubmit={(e) => e.preventDefault()} className="w-full">
          <label htmlFor="title" className="sr-only">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("제목을 입력하세요...")}
            className="w-full pb-2 pl-3 text-3xl font-semibold leading-relaxed text-black placeholder-gray-600 bg-transparent border-b border-white/30 focus:outline-none"
          />
        </form>
        {/* 파일 업로드 테스트용 input */}
        <div className="relative pb-2">
          <form className="flex items-center">
            {/* 버튼 디자인 */}
            <label
              htmlFor="file-upload"
              className=" ml-[10px] inline-block cursor-pointer text-white text-[12px] bg-[#7EACB5] px-2 py-2 rounded-[10px] hover:bg-[#96CCD6] transition"
            >
              {t("썸네일")}
            </label>
            {/* 파일 업로드 input */}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                e.preventDefault();
                const file = e.target.files?.[0] || null;
                setImage(file);
              }}
            />
            {/* 파일 이름 표시*/}
            <span
              id="file-name-display"
              className="ml-3 text-gray-600 text-sm truncate max-w-[150px]"
            >
              {image ? image.name : t("파일을 선택하세요")}
            </span>
          </form>
        </div>

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
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder={t("여기에 내용을 입력하세요...")}
            theme="snow"
          />
        </div>
      </div>
    </div>
  );
}
