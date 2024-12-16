import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLoginStore } from "../../store/API";
import { axiosInstance } from "../../api/axios";
import { Link } from "react-router";
import { userType } from "../../api/api";

export default function NonLoginFriendModal() {
  const [userAll, setUserAll] = useState<userType[]>([]);
  const setUser = useLoginStore((state) => state.setUser);

  // 유저검색창 Ref객체
  const inputRef = useRef<HTMLInputElement>(null);
  const ButtonRef = useRef<HTMLButtonElement>(null);
  const [searchUser, setSearchUser] = useState(userAll);

  // API들(추후에 옮겨야함)
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

  const getAuthUser = async () => {
    const newUser = await (await axiosInstance.get(`/auth-user`)).data;
    localStorage.setItem("LoginUserInfo", JSON.stringify(newUser));
    setUser(newUser);
  };
  // API들(추후에 옮겨야함)

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
            <Link
              to={`/userpage/${
                userOne.username ? userOne.username : userOne.fullName
              }`}
              className="text-black text-lg font-medium "
              onClick={close}
            >
              <div>
                <p className="text-sm font-semibold">
                  {userOne.fullName || "김김김"}
                </p>
                <p className="text-xs text-gray-500">
                  @{userOne.fullName || "buzzusborne"}
                </p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <section className="absolute inset-1/2 w-[502px] h-[619px] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow py-4 pl-2">
      <header className="flex justify-between p-4">
        <h1 className="text-3xl font-bold text-gray-800">전체 목록</h1>
      </header>
      <nav className="flex justify-around h-12 mt-5">
        {
          <>
            <div className="w-[458px] h-12 pl-6 pr-2 py-2 mb-5 bg-white rounded-full shadow border border-gray-200 justify-start items-center gap-4 inline-flex">
              <div className="w-full h-full grow shrink basis-0 flex-col justify-start items-start inline-flex">
                <div className="w-full h-full self-stretch text-black text-sm font-medium  leading-tight">
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
        }
      </nav>
      {renderUsers(searchUser)}
    </section>
  );
}
