import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFriendModalStore } from "../../store/store";
import { axiosInstance } from "../../api/axios";
import { useLoginStore } from "../../store/API";

export default function FriendManageModal() {
  // const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("followers");
  const [activeToggle, setActiveToggle] = useState<string>("friend");
  const [userAll, setUserAll] = useState<userType[]>([]);

  const close = useFriendModalStore((state) => state.close);

  // 유저검색창 Ref객체
  const inputRef = useRef<HTMLInputElement>(null);
  const ButtonRef = useRef<HTMLButtonElement>(null);
  const [searchUser, setSearchUser] = useState(userAll);

  const user = useLoginStore((state) => state.user);
  const token = useLoginStore((state) => state.token);

  const setUser = useLoginStore((state) => state.setUser);

  const getUserAll = async () => {
    try {
      const userAll = (await axiosInstance.get<userType[]>(`/users/get-users`))
        .data;
      setUserAll(userAll);
      setSearchUser(userAll); // searchUser도 첫 페이지 렌더링시 모든 유저로 상태값 업데이트
    } catch (error) {
      console.log(error);
    }
  };

  const postFollow = async (id: string) => {
    // 팔로우 요청을 보내는 코드 안에 유저정보 업데이트 함수까지 실행시켜야 즉각적인 업데이트가 가능하다.
    try {
      const followed = (
        await axiosInstance.post(`follow/create`, { userId: id })
      ).data;
      const updateUser = { ...user! };
      updateUser.following.push(followed);
      setUser(updateUser);
      localStorage.setItem("LoginUserInfo", JSON.stringify(updateUser));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUnFollow = async (id: string) => {
    // 언팔로우 요청을 보내는 코드 안에 유저정보 업데이트 함수까지 실행시켜야 즉각적인 업데이트가 가능하다.
    console.log(`${import.meta.env.VITE_API_URL}follow/delete`);
    console.log(token);
    try {
      const unfollowed = (
        await axiosInstance.delete(`/follow/delete`, {
          data: {
            id: id,
          },
        })
      ).data;
      const updateUser = { ...user! };
      const updateFollow = updateUser.following.filter((e) => {
        return e._id !== unfollowed._id;
      });
      updateUser.following = updateFollow;
      setUser(updateUser);
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthUser = async () => {
    const newUser = await (await axiosInstance.get(`/auth-user`)).data;
    localStorage.setItem("LoginUserInfo", JSON.stringify(newUser));
    setUser(newUser);
  };

  useEffect(() => {
    getUserAll();
    getAuthUser();
  }, []);

  const renderUsers = (userAll: userType[]) => (
    <div className="overflow-auto h-[415px] mt-3 scrollbar-hidden">
      {userAll.map((userOne, idx) => (
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
                {userOne.fullName || "김김김"}
              </p>
              <p className="text-xs text-gray-500">
                @{userOne.fullName || "buzzusborne"}
              </p>
            </div>
          </div>
          {user?.following ? (
            user.following.find((e) => e.user === userOne._id) ? ( // following하고 있는 유저명과 로그인 유저가 일치하면 언팔로우 버튼 활성화
              <Button
                variant="contained"
                sx={{
                  color: "#C96868",
                  backgroundColor: "white",
                  fontWeight: "bold",
                  border: "1px solid #C96868",
                  width: "118px",
                }}
                onClick={() => {
                  deleteUnFollow(
                    user.following.find((e) => e.user === userOne._id)!._id
                  );
                }}
              >
                언팔로우
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  fontWeight: "bold",
                  border: "1px solid black",
                  width: "118px",
                }}
                onClick={() => {
                  postFollow(userOne._id);
                }}
              >
                팔로잉
              </Button>
            )
          ) : null}
        </div>
      ))}
    </div>
  );

  /*
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
  */

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
              <div className="w-[458px] h-12 pl-6 pr-2 py-2 mb-5 bg-white rounded-full shadow border border-gray-200 justify-start items-center gap-4 inline-flex">
                <div className="w-full h-full grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="w-full h-full self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                    <input
                      className="w-full h-full focus:outline-none"
                      placeholder="검색"
                      ref={inputRef}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") ButtonRef.current?.click();
                      }}
                    />
                  </div>
                </div>
                <div className="w-8 h-8 justify-start items-start flex">
                  <div className="grow shrink basis-0 self-stretch p-1 bg-[#7eacb5] rounded-[100px] shadow justify-center items-center gap-2 flex">
                    <button
                      className="w-5 h-5 relative bg-[url(src/asset/images/Search.svg)]"
                      ref={ButtonRef}
                      onClick={() => {
                        const searchUser = userAll.filter((e) =>
                          e.fullName.includes(inputRef.current!.value!)
                        );
                        setSearchUser(searchUser);
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </nav>
        {activeToggle === "friend"
          ? renderUsers(
              activeTab === "followers"
                ? userAll.filter((e) =>
                    user?.followers.some((j) => j.follower === e._id)
                  )
                : userAll.filter((e) =>
                    user?.following.some((j) => j.user === e._id)
                  )
            )
          : renderUsers(searchUser)}
      </section>
    </div>
  );
}
