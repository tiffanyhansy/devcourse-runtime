import { useEffect, useRef, useState } from "react";
import { userType } from "../../api/api";
import { axiosInstance } from "../../api/axios";
import default_profile from "../../asset/default_profile.png";
import { useChatingModalStore } from "../../store/store";

export default function UserSearchModal() {
  const [userAll, setUserAll] = useState<userType[]>([]);
  const [searchUser, setSearchUser] = useState<userType[]>([]);
  const addedUserList = useChatingModalStore((state) => state.addedUserList);
  const setAddedUserList = useChatingModalStore(
    (state) => state.setAddedUserList
  );
  const setIsSearchModalOpenFalse = useChatingModalStore(
    (state) => state.setIsSearchModalOpenFalse
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getUserAll = async () => {
    try {
      const userAll = (await axiosInstance.get<userType[]>(`/users/get-users`))
        .data;
      setUserAll(userAll);
      setSearchUser(userAll);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAll();
  }, []);

  return (
    <article className="w-[300px] h-[500px] flex flex-col gap-[10px] border absolute top-[50px] right-[-301px] bg-white px-[10px] py-[20px] rounded-r-lg">
      <button
        className="w-full py-1 bg-[#E14444] hover:bg-[#f54a4a] text-white rounded-md"
        onClick={setIsSearchModalOpenFalse}
      >
        X
      </button>
      {/* 검색창 */}
      <article className="flex gap-[10px]">
        <input
          type="text"
          className="w-full border rounded-lg p-2 placeholder:text-[12px]"
          placeholder="@을 제외한 유저 ID로 검색 가능합니다."
          ref={inputRef}
          onKeyDown={() => {
            buttonRef.current?.click();
          }}
        />
        <button
          className="w-[50px] rounded-lg bg-[#D5E6E9] hover:bg-[#e8f9fc] px-2 text-[14px]"
          ref={buttonRef}
          onClick={() => {
            const search = userAll.filter((e) => {
              return e.fullName.includes(inputRef.current!.value!);
            });
            setSearchUser(search);
          }}
        >
          검색
        </button>
      </article>
      {/* 리스트 */}
      <article className="w-full h-full border rounded-lg flex flex-col gap-1 overflow-y-scroll custom-scroll">
        {searchUser.map((user) => {
          return (
            <article
              className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-400"
              onClick={() => {
                const listUpdate = [...addedUserList];
                listUpdate.push(user);
                setAddedUserList(listUpdate);
              }}
            >
              <img
                src={user.image ? user.image : default_profile}
                alt={"유저 이미지"}
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
              <article>
                <span className="text-[14px]">{user.fullName}</span>
              </article>
            </article>
          );
        })}
      </article>
    </article>
  );
}
