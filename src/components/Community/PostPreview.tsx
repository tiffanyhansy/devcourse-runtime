import { Post_T, Title_T } from "../../api/api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router";
import default_profile from "../../asset/default_profile.png";
import default_thumbnail from "/src/asset/images/mascot_nobg.svg";

type Props = {
  preview: Post_T;
  currentUser: string | null;
};

export default function PostPreview({ preview, currentUser }: Props) {
  // title 파싱한 객체(여기에 제목, 내용 들어가있고, 추후에 여러 컨텐츠들 추가할 예정 - 목표 달성 트로피 표시 등등)
  const parsedTitle: Title_T = JSON.parse(preview.title);

  // 날짜를 'YYYY년 MM월 DD일' 형식으로 변환하는 함수
  function formatDateToKorean(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  }

  return (
    <article className="bg-white shadow-md hover:shadow-lg transition-transform duration-500 ease-in-out hover:-translate-y-1 rounded-[10px] ">
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
          <p className="line-clamp-3 mb-6	text-sm text-[#495057] h-[3.9rem] ">
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
          <ChatIcon sx={{ fontSize: 14, marginRight: 0.6, marginLeft: 1.5 }} />
          {preview.comments.length}
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
  );
}
