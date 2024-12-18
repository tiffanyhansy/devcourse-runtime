export default function Skeleton() {
  return (
    <article className="bg-white shadow-md animate-pulse rounded-[10px]">
      {/* 썸네일 스켈레톤 */}
      <div className="relative aspect-video bg-gray-300 rounded-t-[10px] overflow-hidden"></div>
      {/* 제목 및 내용 스켈레톤 */}
      <div className="px-4 py-5 h-[163px]">
        <div className="pt-1 h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="space-y-2 h-[3.93rem] mb-7">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="h-3 bg-gray-300 rounded w-2/6"></div>
      </div>
      {/* 작성자 및 추천 수 스켈레톤 */}
      <div className="py-2.5 px-4 flex justify-between items-center border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-8 bg-gray-300 rounded"></div>
          <div className="h-3 w-8 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </article>
  );
}
