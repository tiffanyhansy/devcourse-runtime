export default function ProfileSkeleton() {
  return (
    <section className="p-5 pt-8 overflow-hidden h-[100vh] rounded">
      <article className="flex mt-14">
        <h1 className="text-4xl font-bold">내 프로필</h1>
      </article>

      <div className="flex p-[5rem] justify-between ">
        {/* Profile Picture Skeleton */}
        <div className="flex flex-col items-center space-y-3 animate-pulse">
          <div className="relative w-[22.7rem] h-[22.7rem] bg-gray-300 rounded-full mb-8"></div>
          <div className="h-12 bg-gray-300 rounded w-36"></div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="w-[52%] space-y-6">
          {/* Profile Form Skeleton */}
          <div className="space-y-[46px]">
            {/* ID */}
            <div className="space-y-[12px]">
              <span className="text-xl">ID</span>
              <div className=" bg-gray-300 rounded-xl w-[37rem] h-[3rem] px-[1rem] py-[0.5rem] mb-[3rem]  animate-pulse"></div>
            </div>
            <div className="space-y-[12px]">
              <span className="text-xl">닉네임</span>{" "}
              <div className=" bg-gray-300 rounded-xl w-[37rem] h-[3rem] px-[1rem] py-[0.5rem] mb-[3rem]  animate-pulse"></div>
            </div>
            <div className="space-y-[12px]">
              <span className="text-xl">Website</span>{" "}
              <div className=" bg-gray-300 rounded-xl w-[37rem] h-[3rem] px-[1rem] py-[0.5rem] mb-[3rem]  animate-pulse"></div>
            </div>
            {/* Field */}

            <div className="space-y-3">
              <span className="text-xl">Field</span>{" "}
              <div className="flex space-x-2 animate-pulse">
                <div className="w-12 h-8 bg-gray-300 rounded-3xl"></div>
                <div className="w-12 h-8 bg-gray-300 rounded-3xl"></div>
                <div className="w-12 h-8 bg-gray-300 rounded-3xl"></div>
                <div className="w-12 h-8 bg-gray-300 rounded-3xl"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 animate-pulse">
            <div className="w-40 h-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
