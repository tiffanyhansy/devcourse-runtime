import { Button } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function FriendManage() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");

  const followers = [0, 1, 2, 3, 4, 5, 6]; // 팔로워 임시데이터
  const following = [0, 1, 2, 3]; // 팔로잉 임시데이터

  return (
    <section className="flex justify-center gap-40 p-5 pt-28 overflow-hidden h-[100vh]">
      <article>
        <div className="w-[272px] h-[31px] text-[#3e435d] text-4xl font-bold font-['Roboto']">
          친구 목록
        </div>
        <div className="w-[472px] h-[659px] relative mt-7">
          <div className="w-[464px] h-12 bg-white flex-col justify-start items-start inline-flex">
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
                          className={`text-base font-bold font-['Roboto'] leading-[21px] tracking-tight cursor-pointer ${
                            activeTab === "followers"
                              ? "text-[#7eacb5]"
                              : "text-[#3c3c43]/60"
                          }`}
                        >
                          팔로워
                        </div>
                      </div>
                      <div
                        className={`self-stretch h-0.5 py-[1.50px]  ${
                          activeTab === "followers"
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
              <div
                className="grow shrink basis-0 self-stretch flex-col justify-start items-center inline-flex"
                onClick={() => setActiveTab("following")}
              >
                <div className="self-stretch grow shrink basis-0 flex-col justify-center items-start flex">
                  <div className="self-stretch grow shrink basis-0 flex-col justify-center items-center flex">
                    <div className="self-stretch grow shrink basis-0 pt-4 flex-col justify-start items-start gap-2.5 flex">
                      <div className="self-stretch grow shrink basis-0 flex-col justify-center items-center gap-2 flex">
                        <div
                          className={`text-base font-bold font-['Roboto'] leading-[21px] tracking-tight cursor-pointer ${
                            activeTab === "followers"
                              ? "text-[#3c3c43]/60"
                              : "text-[#7eacb5]"
                          }`}
                        >
                          팔로잉
                        </div>
                      </div>
                      <div
                        className={`self-stretch h-0.5 py-[1.50px]  ${
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
          <div className="w-[472px] h-[400px] overflow-auto p-2 left-0 top-[62px] absolute bg-white rounded-[20px] shadow flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-[70px] px-2.5 rounded-md flex-col justify-start items-start gap-2.5 flex">
              {(activeTab === "followers" ? followers : following).map(
                (v, i) => (
                  <div className="self-stretch grow shrink basis-0  items-center gap-2.5 inline-flex">
                    <div className="h-[70px] py-2.5 justify-center items-center flex">
                      <div className="h-[50px] justify-start items-start gap-2.5 inline-flex">
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
                          key={uuidv4()}
                          variant="contained"
                          sx={{
                            color: "black", // hover 시 텍스트 색 변경
                            backgroundColor: "white", // hover 시 배경색 변경
                            fontWeight: "bold",
                            border: "1px solid black",
                            width: "100px",
                            marginLeft: "160px",
                            "&:hover": {
                              border: "1px solid #C96868",
                              color: "#C96868",
                            },
                          }}
                          onMouseEnter={() => setIsHovered(true)} // 마우스를 올릴 때 텍스트 변경
                          onMouseLeave={() => setIsHovered(false)} // 마우스를 뗄 때 텍스트 원래대로
                        >
                          {isHovered ? "언팔로우" : "팔로잉"}
                          {/* hover 상태에 따라 텍스트 변경 */}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </article>

      <article className="flex flex-col">
        <div className="w-[272px] h-[31px] text-[#3e435d] text-4xl font-bold font-['Roboto']">
          사용자 목록
        </div>
        <div className="w-[458px] h-12 pl-6 pr-2 py-2 mt-7 bg-white rounded-full shadow border border-gray-200 justify-start items-center gap-4 inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
            <div className="self-stretch text-black text-sm font-medium font-['Inter'] leading-tight">
              <input className="w-full pl-3" placeholder="검색" />
            </div>
          </div>
          <div className="w-8 h-8 justify-start items-start flex">
            <div className="grow shrink basis-0 self-stretch p-1 bg-[#7eacb5] rounded-[100px] shadow justify-center items-center gap-2 flex">
              <div className="w-5 h-5 relative bg-[url('src/asset/images/Icon.svg')]" />
            </div>
          </div>
        </div>
        <div className=" relative -mt-10">
          <div className="w-[472px] h-[400px] overflow-auto p-2 left-0 top-[52px] absolute bg-white rounded-[20px] shadow flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-[70px] px-2.5 rounded-md flex-col justify-start items-start gap-2.5 flex">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div className="self-stretch grow shrink basis-0  items-center gap-2.5 inline-flex">
                  <div className="h-[70px] py-2.5 justify-center items-center flex">
                    <div className="h-[50px] justify-start items-start gap-2.5 inline-flex">
                      <img
                        className="w-[50px] h-[50px] rounded-[100px]"
                        src="https://via.placeholder.com/50x50"
                      />
                      <div className="flex flex-col grow shrink basis-0 h-[50px]">
                        <span className="text-[#0f1419] text-sm font-semibold font-['Inter'] leading-[19px]">
                          기수수
                        </span>
                        <span className="text-[#333333] text-[13px] font-normal font-['Inter'] leading-[19px]"></span>
                        <span className="text-[#546471] text-[13px] font-normal font-['Inter'] leading-[19px]">
                          @buzzusborne
                        </span>
                      </div>
                      <Button
                        variant="contained"
                        sx={{
                          color: "#7EACB5",
                          backgroundColor: "white", // hover 시 배경색 변경
                          fontWeight: "bold",
                          border: "1px solid #7EACB5",
                          width: "100px",
                          marginLeft: "160px",
                        }}
                      >
                        팔로우
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
