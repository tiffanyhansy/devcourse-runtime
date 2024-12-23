import { useEffect, useRef, useState } from "react";
import { userType } from "../../api/api";
import { axiosInstance } from "../../api/axios";
import default_profile from "../../asset/default_profile.png";
import { useChatingModalStore } from "../../store/store";
import { v4 as uuidv4 } from "uuid";
import close from "../../asset/images/close.svg";
import search_user_icon from "../../asset/images/search_user_icon.svg";
import { t } from "i18next";

export default function UserSearchModal() {
  const [userAll, setUserAll] = useState<userType[]>([]);
  const [searchUser, setSearchUser] = useState<userType[]>([]);
  const setIsSearchModalOpenFalse = useChatingModalStore(
    (state) => state.setIsSearchModalOpenFalse
  );
  const setIsChatingOpenTrue = useChatingModalStore(
    (state) => state.setIsChatingOpenTrue
  );
  const setIsChatingOpenFalse = useChatingModalStore(
    (state) => state.setIsChatingOpenFalse
  );

  const setNowChatId = useChatingModalStore((state) => state.setNowChatId);

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
    <article className="w-[250px] absolute top-0 right-[-271px] bg-white shadow-lg rounded-[10px]">
      {/* 최상단 바바 */}
      <article className="w-full h-[40px] rounded-t-[10px] bg-[#7EACB5] flex justify-between items-center px-[10px] relative">
        <span className="text-white">{t("대화 상대 검색")}</span>
        <button
          className="w-[24px] h-[24px]"
          onClick={setIsSearchModalOpenFalse}
        >
          <img src={close} alt="닫기 아이콘" />
        </button>
      </article>
      <article className="flex flex-col">
        {/* 리스트 */}
        <article className="w-full h-[200px] flex flex-col gap-1 overflow-y-scroll custom-scroll">
          {searchUser.map((user) => {
            return (
              <article
                className="flex items-center gap-2 cursor-pointer p-2 hover:bg-[#EAEAEA]"
                onClick={() => {
                  // const listUpdate = [...addedUserList];
                  // listUpdate.push(user);
                  // setAddedUserList(listUpdate);
                  setNowChatId(user._id);
                  setIsChatingOpenFalse();
                  setTimeout(() => {
                    setIsChatingOpenTrue();
                  });
                }}
                key={uuidv4()}
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
        {/* 검색창 */}
        <article className="flex gap-[5px] p-2">
          <input
            type="text"
            className="w-full rounded-lg p-2 placeholder:text-[10px] text-[10px] bg-[#F0F0F0] focus:outline-none"
            placeholder={t("@을 제외한 유저 ID로 검색 가능합니다.")}
            ref={inputRef}
            onKeyDown={() => {
              buttonRef.current?.click();
            }}
          />
          <button
            className="w-[40px] rounded-lg bg-[#D5E6E9] hover:bg-[#e8f9fc] text-[14px] flex justify-center items-center"
            ref={buttonRef}
            onClick={() => {
              const search = userAll.filter((e) => {
                return e.fullName.includes(inputRef.current!.value!);
              });
              setSearchUser(search);
            }}
          >
            <img src={search_user_icon} alt="유저 검색 아이콘" />
          </button>
        </article>
      </article>
    </article>
  );
}
