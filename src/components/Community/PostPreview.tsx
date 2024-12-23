import { useRef, useState } from "react";
import { Link } from "react-router";
import { Post_T, Title_T, PostComment } from "../../api/api";
import { useCommentStore } from "../../store/comment";
import { useLoginStore } from "../../store/API";
import ControlBtn from "./ControlBtn";
import CommentComponent from "./CommentComponent";
import default_profile from "../../asset/default_profile.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import default_thumbnail from "/src/asset/images/mascot_nobg.svg";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./DeleteDialog";
import useSnackbarStore from "../../store/store";
import SnackbarComponent from "../editor/SnackBar";

type Props = {
  preview: Post_T;
  currentUser: string | null;
  postId?: string;
};

export default function PostPreview({ preview, currentUser }: Props) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); //삭제 모달
  const [isOpen, setIsOpen] = useState(false); // 모달 열림 상태
  const [isAnimating, setIsAnimating] = useState(false); // 닫히는 중 상태
  const modalRef = useRef<HTMLDivElement>(null);
  const user = useLoginStore((state) => state.user);
  const { showSnackbar } = useSnackbarStore(); //스낵바

  const { t } = useTranslation();

  // zustand에서 상태 가져오기
  const { posts, deletePost } = useCommentStore();

  const updatedPost = posts.find((post) => post._id === preview._id) || preview;

  //게시물 삭제
  const handleDeletePost = async () => {
    if (!preview._id) {
      showSnackbar("삭제하려는 게시물의 ID를 찾을 수 없습니다.", "error");
      return;
    }
    if (!user) {
      showSnackbar("로그인을 하셔야 합니다.", "error");
      return;
    }
    const isDeleted = await deletePost(preview._id);

    if (isDeleted) {
      setIsOpen(false); // 모달 닫기
      showSnackbar("게시물이 성공적으로 삭제되었습니다!", "success");
    } else {
      showSnackbar("게시물 삭제에 실패했습니다.", "error");
    }
  };

  //최상단 스크롤 버튼
  const handleToTopButton = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //댓글이동 버튼
  const commentInputRef = useRef<HTMLInputElement>(null);
  const handleClickCommentButton = () => {
    if (commentInputRef.current) {
      commentInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // 모달 열기
  const openModal = () => {
    // 현재 스크롤 위치 저장 및 고정
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    // Tailwind로 고정 클래스 추가
    document.documentElement.classList.add("overflow-hidden");

    // 스크롤 위치를 저장하여 복원 가능하도록 설정
    document.documentElement.style.setProperty("--scroll-y", `${scrollY}px`);

    setIsOpen(true);
    setIsAnimating(false); // 초기화
  };

  // 모달 닫기
  const closeModal = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };
  // 애니메이션 종료 처리
  const handleAnimationEnd = () => {
    if (isAnimating) {
      setIsAnimating(false); // 초기화
      setIsOpen(false); // 모달 닫기

      // Tailwind 고정 클래스 제거
      document.documentElement.classList.remove("overflow-hidden");

      // 스크롤 위치 복원
      const scrollY = parseInt(
        document.documentElement.style.getPropertyValue("--scroll-y") || "0",
        10
      );
      window.scrollTo(0, scrollY);
    }
  };
  // 제목과 내용을 JSON 파싱
  const parsedTitle: Title_T = (() => {
    try {
      return JSON.parse(preview.title);
    } catch {
      return { title: t("제목 없음"), content: t("내용 없음") };
    }
  })();

  // 날짜 포맷 함수
  const formatDateToKorean = (dateString: string): string => {
    const date = new Date(dateString);
    return t("{{year}}년 {{month}}월 {{day}}일", {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  };

  return (
    <>
      <SnackbarComponent />
      <article
        className="bg-white scrollbar-gutter-stable shadow-md hover:shadow-lg transition-transform duration-500 ease-in-out hover:-translate-y-1 rounded-[10px] cursor-pointer"
        onClick={openModal}
      >
        {/* 썸네일 이미지 */}
        <div className="relative aspect-video rounded-t-[10px] overflow-hidden">
          <img
            src={preview.image ? preview.image : default_thumbnail}
            alt={parsedTitle.title}
            className="object-cover w-full h-full"
          />
        </div>
        {/* 글 제목 및 내용 미리보기 */}
        <div className="p-4">
          <h4 className="mb-1 text-base font-bold truncate">
            {parsedTitle.title}
          </h4>
          <div>
            <p className="line-clamp-2 mb-6 text-sm text-[#495057] h-[3.9rem]">
              {parsedTitle.content}
            </p>
          </div>
          <div className="text-xs text-[#868e96]">
            <span>{formatDateToKorean(preview.createdAt)}</span>
          </div>
        </div>
        {/* 작성자 및 추천 수 */}
        <div className="py-2.5 px-4 justify-between flex text-xs border-t border-[#f1f3f5] ">
          <div className="flex items-center">
            <FavoriteIcon sx={{ fontSize: 14, marginRight: 0.6 }} />
            {Array.isArray(updatedPost.likes) ? updatedPost.likes.length : 0}
            <ChatIcon
              sx={{ fontSize: 14, marginRight: 0.6, marginLeft: 1.5 }}
            />
            {updatedPost.comments.length}
          </div>
          <div className="flex items-center ">
            <Link
              to={
                currentUser === preview.author.fullName
                  ? `/mypage`
                  : `/userpage/${preview.author.fullName}`
              }
              className="flex items-center"
            >
              <img
                src={
                  !preview.author.image || preview.author.image === ""
                    ? default_profile
                    : preview.author.image
                }
                alt="글쓴이 프로필 이미지"
                className="object-cover w-6 h-6 mr-2 rounded-full"
              />
              <span className="font-bold">{preview.author.fullName}</span>
            </Link>
          </div>
        </div>
      </article>

      {/*상세페이지 모달 */}
      {(isOpen || isAnimating) && (
        <div
          ref={modalRef}
          className={`overflow-y-auto fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start z-50 transition-opacity duration-300${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative w-[90%] md:w-[65%] min-h-screen bg-gray-50 overflow-y-auto ${
              isAnimating ? "animate-slideOut" : "animate-glassBlur"
            }`}
            onAnimationEnd={handleAnimationEnd}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 삭제 다이얼로그 */}
            {isDeleteOpen && (
              <DeleteDialog
                onClose={() => setIsDeleteOpen(false)}
                onDelete={handleDeletePost}
              />
            )}

            {/* 삭제 버튼 */}
            <IconButton
              onClick={() => setIsDeleteOpen(true)}
              sx={{
                position: "absolute",
                top: { xs: 42, sm: 42 },
                right: { xs: 136, sm: 104 },
                color: "#C96868",
                "&:hover": {
                  color: "#FFFFFF",
                  backgroundColor: "#C96868",
                },
                width: 40,
                height: 40,
              }}
            >
              <DeleteIcon sx={{ fontSize: 28 }} /> {/* 휴지통 아이콘 크기 */}
            </IconButton>

            {/* 프로필 섹션 */}
            <div className="w-[77%] mx-auto flex items-center space-x-4 py-4 mt-4">
              <Link
                to={
                  currentUser === preview.author.fullName
                    ? `/mypage`
                    : `/userpage/${preview.author.fullName}`
                }
                className="flex items-center group"
              >
                {/* 프로필 이미지 */}
                <div className="relative">
                  <img
                    src={
                      !preview.author.image || preview.author.image === ""
                        ? default_profile
                        : preview.author.image
                    }
                    alt="글쓴이 프로필 이미지"
                    className="w-16 h-16 rounded-full object-cover transform transition-transform duration-500 group-hover:rotate-[360deg]"
                  />
                </div>
                {/* 프로필 이름 */}
                <span className="font-bold text-xl ml-4 opacity-0 translate-x-[-20px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  {preview.author.fullName}
                </span>
              </Link>
            </div>

            {/* 메인 */}
            <div className="flex flex-col items-center p-5 select-text">
              <div className="relative aspect-video rounded-[10px] overflow-hidden mb-6 w-[80%] mx-auto">
                <img
                  src={preview.image ? preview.image : default_thumbnail}
                  alt={parsedTitle.title}
                  className="object-cover w-full"
                />
              </div>
              <div className="flex flex-col items-center w-[80%] mx-auto">
                <h2 className="mt-12 text-3xl font-bold">
                  {parsedTitle.title}
                </h2>
                <p className="text-base break-words mt-12 w-[80%]">
                  {parsedTitle.content}
                </p>
                <CommentComponent
                  inputRef={commentInputRef}
                  postId={updatedPost._id}
                  author={preview.author}
                  comments={updatedPost.comments as PostComment[]}
                />
                {/* <CommentUI /> */}
              </div>
            </div>
            {/* 모달 배경 고정 버튼 필드 */}
            <ControlBtn
              onToTop={handleToTopButton}
              onComment={handleClickCommentButton}
              postId={preview._id}
              author={preview.author}
              currentUserId={currentUser}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </>
  );
}
