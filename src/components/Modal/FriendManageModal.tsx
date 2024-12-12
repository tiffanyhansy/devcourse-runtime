import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFriendModalStore } from "../../store/store";
import { axiosInstance } from "../../api/axios";

export default function FriendManageModal() {
  const [isHovered, setIsHovered] = useState(false);

  const [activeTab, setActiveTab] = useState("followers"); // 팔로우 / 팔로워 탭
  const [activeToggle, setActiveToggle] = useState("friend"); // 친구 / 전체 탭

  const close = useFriendModalStore((state) => state.close);

  const followers = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // 팔로워 임시데이터
  const following = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 팔로잉 임시데이터

  // 테스트용 상태
  const [userAll, setUserAll] = useState<userType[] | []>([]);

  const getUserAll = async () => {
    const userAll = (await axiosInstance.get(`/users/get-users`)).data;
    setUserAll(() => userAll);
  };

  useEffect(() => {
    getUserAll();
  }, []);

  return (
    <div className="w-full h-full block absolute left-0 top-0 z-40">
      {/* 뒷배경경 */}
      <div
        className="w-full h-[927px] block bg-black bg-opacity-70"
        onClick={close}
      ></div>
      <section className="h-[619px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[10px]">
        <article className="flex justify-center ">
          <div className=" relative">
            <div className="w-[502px]  relative">
              <div className="w-[502px]  h-[689px] p-2 left-0 top-0 absolute bg-white rounded-[20px] shadow ">
                {/* 친구목록 */}
                {activeToggle === "friend" && (
                  <div className="absolute top-[230px]">
                    <div className="w-[464px] h-12 left-[18px] top-[-74px] absolute bg-white flex-col justify-start items-start inline-flex">
                      {/* 탭 */}
                      <div className="self-stretch grow shrink basis-0 justify-start items-start inline-flex">
                        <div
                          className="grow shrink basis-0 self-stretch flex-col justify-start items-start inline-flex"
                          onClick={() => setActiveTab("followers")}
                        >
                          <div className="self-stretch grow shrink basis-0 flex-col justify-center items-start flex">
                            <div className="self-stretch grow shrink basis-0 flex-col justify-start items-center flex">
                              <div className="self-stretch grow shrink basis-0 pt-4 flex-col justify-center items-center gap-2.5 flex">
                                <div className="self-stretch grow shrink basis-0 flex-col justify-center items-center gap-2 flex">
                                  <div
                                    className={`text-base font-bold font-['Roboto'] leading-[21px] tracking-tight cursor-pointer transition-all duration-300 ${
                                      activeTab === "followers"
                                        ? "text-[#7eacb5]"
                                        : "text-[#3c3c43]/60"
                                    }`}
                                  >
                                    팔로워
                                  </div>
                                </div>
                                <div
                                  className={`self-stretch h-0.5 py-[1.50px]  transition-all duration-300 absolute w-1/2 top-12  ${
                                    activeTab === "followers"
                                      ? "left-0"
                                      : "left-1/2"
                                  } bg-[#7eacb5] justify-start items-start gap-2.5 inline-flex`}
                                >
                                  <div className="w-5 h-[0px] relative" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="grow shrink basis-0 self-stretch flex-col justify-start items-center inline-flex"
                          onClick={() => setActiveTab("following")}
                        >
                          <div className="self-stretch grow shrink basis-0 flex-col justify-center items-start flex">
                            <div className="self-stretch grow shrink basis-0 flex-col justify-center items-center flex">
                              <div className="self-stretch grow shrink basis-0 pt-4 flex-col justify-start items-start gap-2.5 flex">
                                <div className="self-stretch grow shrink basis-0 flex-col justify-center items-center gap-2 flex">
                                  <div
                                    className={`text-base font-bold font-['Roboto'] leading-[21px] tracking-tight cursor-pointer transition-all duration-300 ${
                                      activeTab === "followers"
                                        ? "text-[#3c3c43]/60"
                                        : "text-[#7eacb5]"
                                    }`}
                                  >
                                    팔로잉
                                  </div>
                                </div>
                                <div
                                  className={`self-stretch h-0.5 py-[1.50px] transition-all duration-300${
                                    activeTab === "following"
                                      ? "bg-[#7eacb5]"
                                      : "opacity-0"
                                  } justify-start items-start gap-2.5 inline-flex`}
                                >
                                  <div className="w-5 h-[0px] relative" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-auto h-[420px]">
                      {(activeTab === "followers" ? followers : following).map(
                        (i) => (
                          <div
                            key={uuidv4()}
                            className="self-stretch h-[70px] px-2.5 pl-10 rounded-md flex-col items-start gap-2.5 flex"
                          >
                            <div className="self-stretch grow shrink basis-0 items-center gap-2.5 inline-flex">
                              <div className="h-[70px] py-2.5 justify-center items-center flex">
                                <div className="flex h-[50px] items-center gap-2.5 w-full justify-between">
                                  {/* 이미지와 텍스트 그룹 */}
                                  <div className="flex items-center gap-2.5">
                                    <img
                                      className="w-[50px] h-[50px] rounded-[100px]"
                                      src="https://via.placeholder.com/50x50"
                                    />
                                    <div className="flex flex-col grow shrink basis-0 h-[50px]">
                                      <span className="text-[#0f1419] text-sm font-semibold font-['Inter'] leading-[19px]">
                                        김김김
                                      </span>
                                      <span className="text-[#333333] text-[13px] font-normal font-['Inter'] leading-[19px]"></span>
                                      <span className="text-[#546471] text-[13px] font-normal font-['Inter'] leading-[19px]">
                                        @buzzusborne
                                      </span>
                                    </div>
                                    <Button
                                      variant="contained"
                                      sx={{
                                        color: "#7EACB5", // hover 시 텍스트 색 변경
                                        fontWeight: "bold",
                                        background: "white",
                                        border: "1px solid #7EACB5",
                                        width: "100px",
                                        marginLeft: "150px",
                                      }}
                                    >
                                      팔로우
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
                {/* 친구목록 */}

                {/* 전체 목록 */}
                {activeToggle === "all" && (
                  <div className="absolute top-[163px]">
                    <div className="w-[458px] h-12 pl-6 pr-2 py-2 mb-5 ml-4 bg-white rounded-full shadow border border-gray-200 justify-start items-center gap-4 inline-flex">
                      <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                        <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
                          <input className="w-full" placeholder="검색" />
                        </div>
                      </div>
                      <div className="w-8 h-8 justify-start items-start flex">
                        <div className="grow shrink basis-0 self-stretch p-1 bg-[#7eacb5] rounded-[100px] shadow justify-center items-center gap-2 flex">
                          <div className="w-5 h-5 relative bg-[url(src/asset/images/Search.svg)]" />
                        </div>
                      </div>
                    </div>
                    <div className="overflow-auto h-[420px]">
                      {userAll.map((user, idx) => (
                        <div
                          key={uuidv4()}
                          className="self-stretch h-[70px] px-2.5 pl-10 rounded-md flex-col items-start gap-2.5 flex"
                        >
                          <div className="self-stretch grow shrink basis-0 items-center gap-2.5 inline-flex">
                            <div className="h-[70px] py-2.5 justify-center items-center flex">
                              <div className="flex h-[50px] items-center gap-2.5 w-full justify-between">
                                {/* 이미지와 텍스트 그룹 */}
                                <div className="flex items-center gap-2.5">
                                  <img
                                    className="w-[50px] h-[50px] rounded-[100px]"
                                    src="https://via.placeholder.com/50x50"
                                  />
                                  <div className="flex flex-col grow shrink basis-0 h-[50px]">
                                    <span className="text-[#0f1419] text-sm font-semibold font-['Inter'] leading-[19px]">
                                      {user.fullName}
                                    </span>
                                    <span className="text-[#333333] text-[13px] font-normal font-['Inter'] leading-[19px]"></span>
                                    <span className="text-[#546471] text-[13px] font-normal font-['Inter'] leading-[19px]">
                                      {`@${user.fullName}`}
                                    </span>
                                  </div>
                                  <Button
                                    id={uuidv4()}
                                    variant="contained"
                                    sx={{
                                      color: isHovered ? "#C96868" : "black", // hover 시 텍스트 색 변경
                                      backgroundColor: "white", // hover 시 배경색 변경
                                      fontWeight: "bold",
                                      border: "1px solid black",
                                      width: "100px",
                                      marginLeft: "150px",
                                      "&:hover": {
                                        border: "1px solid #C96868",
                                        color: "#C96868",
                                      },
                                    }}
                                    onMouseEnter={() => setIsHovered(true)} // 마우스를 올릴 때 텍스트 변경
                                    onMouseLeave={() => setIsHovered(false)} // 마우스를 뗄 때 텍스트 원래대로
                                  >
                                    {isHovered ? "언팔로우" : "팔로잉"}{" "}
                                    {/* hover 상태에 따라 텍스트 변경 */}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-[272px] h-[31px] left-7 top-[110px] absolute text-[#3e435d] text-3xl font-bold font-['Roboto']">
                {activeToggle === "all" ? "전체 목록" : "친구 목록"}
              </div>
              <div className="w-[120px] h-[50px] left-[190px] top-7 absolute">
                <div className="relative w-[120px] h-[50px]">
                  {/* 배경 바 */}
                  <div className="absolute inset-0 bg-white rounded-[229.08px] border border-[#7eacb5]" />

                  {/* 슬라이더 */}
                  <div
                    className={`absolute top-0 w-[77.06px] h-[50px] bg-[#7eacb5] rounded-[229.08px] border border-white 
    transition-all duration-300 ${
      activeToggle === "friend" ? "left-0" : "left-[58px]"
    }`}
                  />

                  {/* "친구" 버튼 */}
                  <div
                    className={`absolute left-[16px] top-[10px] text-center ${
                      activeToggle === "friend"
                        ? "text-white"
                        : "text-[#7eacb5]"
                    } text-[17px] font-medium font-['Montserrat'] uppercase leading-[28.80px] cursor-pointer`}
                    onClick={() => setActiveToggle("friend")}
                  >
                    친구
                  </div>

                  {/* "전체" 버튼 */}
                  <div
                    className={`absolute left-[76.57px] top-[10px] text-center ${
                      activeToggle === "all" ? "text-white" : "text-[#7eacb5]"
                    } text-[17px] font-medium font-['Montserrat'] uppercase
                       leading-[28.80px] cursor-pointer`}
                    onClick={() => setActiveToggle("all")}
                  >
                    전체
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
