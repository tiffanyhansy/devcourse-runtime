import { Post_T, Title_T } from "../../api/api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router";

type Props = {
  preview: Post_T;
};

export default function PostPreview({ preview }: Props) {
  const sampleImgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrgVj6z0tfzZSheYRKDWVUhB5zIkiZ9vUo6rFSULPgctqkQSmlkwfCDZ1RMHxgFF2XKIlAJb_28QzyZaR5s6zfQ";

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
          src={preview.image ? preview.image : sampleImgUrl}
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
          <p className="line-clamp-3 mb-6	text-sm text-[#495057] h-[3.93rem] ">
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
            to={`/userpage/${preview.author.fullName}`}
            className="flex items-center"
          >
            <img
              src={preview.author.image}
              alt="글쓴이 프로필 이미지"
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="font-bold">{preview.author.fullName}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
