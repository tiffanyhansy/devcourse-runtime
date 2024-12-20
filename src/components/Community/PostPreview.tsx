import { Post_T, Title_T } from "../../api/api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router";
import { useRef, useEffect, useState } from "react";
import { useCommentStore } from "../../store/comment"; // zustand 스토어 가져오기
import default_profile from "../../asset/default_profile.png";
import default_thumbnail from "/src/asset/images/mascot_nobg.svg";
import { useTranslation } from "react-i18next";
import PostButtonFieldCol from "../Post/PostButtonFieldCol";
import CommentComponent from "./CommentComponent";

type Props = {
  preview: Post_T;
  currentUser: string | null;
};

export default function PostPreview({ preview, currentUser }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  // zustand에서 상태 가져오기
  const { posts, fetchPosts } = useCommentStore();
  const updatedPost = posts.find((post) => post._id === preview._id) || preview;

  // Modal 토글
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Modal Scroll 관리
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // 게시물 업데이트를 위해 상태 갱신
  useEffect(() => {
    fetchPosts(); // 상태 초기화
  }, [fetchPosts]);

  const handleToTopButton = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleClickCommentButton = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({
        top: modalRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // 제목과 내용을 JSON 파싱
  const parsedTitle: Title_T = (() => {
    try {
      return JSON.parse(preview.title);
    } catch {
      return { title: "제목 없음", content: "내용 없음" };
    }
  })();

  // 날짜 포맷 함수
  const formatDateToKorean = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

    return `${year}${t("년")} ${month}${t("월")} ${day}${t("일")}`;
  }

  // 댓글 갯수 동적 업데이트를 위해 zustand 상태와 연결
  const currentPost = posts.find((post) => post._id === preview._id);


  return (
    <>
      <article
        className="bg-white shadow-md hover:shadow-lg transition-transform duration-500 ease-in-out hover:-translate-y-1 rounded-[10px] cursor-pointer"
        onClick={toggleModal}
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
          <h4 className="truncate mb-1 font-bold text-base">
            {parsedTitle.title}
          </h4>
          <div>
            <p className="line-clamp-2 mb-6 text-sm text-[#495057]">
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
            {preview.likes.length}
            <ChatIcon
              sx={{ fontSize: 14, marginRight: 0.6, marginLeft: 1.5 }}
            />
            {currentPost?.comments.length || preview.comments.length}
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
                className="w-6 h-6 mr-2 rounded-full"
              />
              <span className="font-bold">{preview.author.fullName}</span>
            </Link>
          </div>
        </div>
      </article>

      {/* 화면 중앙에 배치된 상세페이지 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start overflow-y-auto z-50"
          onClick={toggleModal}
        >
          <div
            ref={modalRef}
            className="relative w-[90%] md:w-[65%] min-h-screen bg-white transform transition-transform duration-300 ease-in-out translate-y-0 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex items-center space-x-4 px-20 md:px-10">
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
                  className="w-16 h-16 rounded-full object-cover"
                />
                <span className="font-bold text-xl">
                  {preview.author.fullName}
                </span>
              </Link>
            </div>
            <div className="p-5 flex flex-col">
              <div className="relative aspect-video rounded-[10px] overflow-hidden mb-6 w-[80%] mx-auto">
                <img
                  src={preview.image ? preview.image : default_thumbnail}
                  alt={parsedTitle.title}
                  className="object-cover w-full"
                />
              </div>
              <div className="w-[80%] mx-auto">
                <h2 className="text-3xl font-bold mb-4">{parsedTitle.title}</h2>
                <p className="text-base break-words">{parsedTitle.content}</p>
                <CommentComponent postId={updatedPost._id} />
              </div>
            </div>
          </div>
          {/* 모달 배경 위 고정 버튼 필드 */}
          <div className="fixed bottom-4 right-4 z-50">
            <PostButtonFieldCol
              onToTop={handleToTopButton}
              onComment={handleClickCommentButton}
            />
          </div>
        </div>
      )}
    </>
  );
}
