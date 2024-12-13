import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFriendModalStore } from "../../store/store";
import { axiosInstance } from "../../api/axios";

interface User {
  fullName?: string;
}

export default function FriendManageModal() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("followers");
  const [activeToggle, setActiveToggle] = useState<string>("friend");
  const [userAll, setUserAll] = useState<User[]>([]);

  const close = useFriendModalStore((state) => state.close);

  //임시데이터
  const followers: User[] = Array.from({ length: 9 }, (_, idx) => ({
    fullName: `Follower ${idx + 1}`,
  }));
  const following: User[] = Array.from({ length: 11 }, (_, idx) => ({
    fullName: `Following ${idx + 1}`,
  }));

  useEffect(() => {
    const getUserAll = async () => {
      const userAll = (await axiosInstance.get<User[]>(`/users/get-users`))
        .data;
      setUserAll(userAll);
    };
    getUserAll();
  }, []);

  const renderUsers = (users: User[]) => (
    <div className="overflow-auto h-[415px] mt-3 scrollbar-hidden">
      {users.map((user, idx) => (
        <div
          key={uuidv4()}
          className="flex items-center justify-between p-4 rounded-md hover:bg-gray-100"
        >
          <div className="flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full"
              src="https://via.placeholder.com/50x50"
              alt="profile"
            />
            <div>
              <p className="text-sm font-semibold">
                {user.fullName || "김김김"}
              </p>
              <p className="text-xs text-gray-500">
                @{user.fullName || "buzzusborne"}
              </p>
            </div>
          </div>
          <Button
            variant="contained"
            sx={{
              color: "black",
              backgroundColor: "white",
              fontWeight: "bold",
              border: "1px solid black",
              width: "118px",
              "::after": {
                content: '"언팔로우"', // Hover 시 나타날 텍스트
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#C96868",
                opacity: 0,
                transition: "none",
              },
              "&:hover": {
                transition: "none",
                border: "1px solid #C96868",
                color: "transparent", // 기존 텍스트 숨기기
                "::after": {
                  opacity: 1, // Hover 시 텍스트 보이기
                },
              },
            }}
          >
            팔로잉
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={close}
      ></div>
      <section className="absolute inset-1/2 w-[502px] h-[619px] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow py-4 pl-2">
        <header className="flex justify-between p-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeToggle === "all" ? "전체 목록" : "친구 목록"}
          </h1>
          <div className="relative w-32 h-10">
            <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
            <div
              className={`absolute top-0 w-[50%] h-full bg-[#7eacb5] rounded-full transition-transform duration-300 ${
                activeToggle === "friend" ? "translate-x-0" : "translate-x-full"
              }`}
            ></div>
            <div
              className="absolute inset-y-0 left-4 flex items-center text-sm font-semibold text-center cursor-pointer text-white"
              onClick={() => setActiveToggle("friend")}
            >
              친구
            </div>
            <div
              className="absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-center cursor-pointer text-white"
              onClick={() => setActiveToggle("all")}
            >
              전체
            </div>
          </div>
        </header>
        <nav className="flex justify-around h-12 mt-5">
          {activeToggle === "friend" ? (
            <>
              <div
                className={`pb-2 cursor-pointer ${
                  activeTab === "followers"
                    ? "text-[#7eacb5] border-b-2 border-[#7eacb5]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("followers")}
              >
                팔로워
              </div>
              <div
                className={`pb-2 cursor-pointer ${
                  activeTab === "following"
                    ? "text-[#7eacb5] border-b-2 border-[#7eacb5]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("following")}
              >
                팔로잉
              </div>
            </>
          ) : (
            <>
              <div className="w-[458px] h-12 pl-6 pr-2 py-2 mb-5 ml-4 bg-white rounded-full shadow border border-gray-200 justify-start items-center gap-4 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                    <input className="w-full" placeholder="검색" />
                  </div>
                </div>
                <div className="w-8 h-8 justify-start items-start flex">
                  <div className="grow shrink basis-0 self-stretch p-1 bg-[#7eacb5] rounded-[100px] shadow justify-center items-center gap-2 flex">
                    <button className="w-5 h-5 relative bg-[url(src/asset/images/Search.svg)]" />
                  </div>
                </div>
              </div>
            </>
          )}
        </nav>
        {activeToggle === "friend"
          ? renderUsers(activeTab === "followers" ? followers : following)
          : renderUsers(userAll)}
      </section>
    </div>
  );
}
