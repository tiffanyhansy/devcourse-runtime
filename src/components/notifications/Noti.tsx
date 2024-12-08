import { Button } from "@mui/material";
import { useState } from "react";
export default function Noti() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <article className="flex w-full mt-[100px] mb-20 justify-center items-center flex-col">
      <div className="w-[800px] p-2 bg-white rounded-[20px] shadow flex-col justify-start items-start inline-flex">
        {/* 첫 번째 알림 */}
        <div className="self-stretch h-[70px] px-2.5 rounded-md flex-col items-start gap-2.5 flex">
          <div className="self-stretch grow shrink basis-0 items-center gap-2.5 inline-flex">
            <div className="h-[70px] py-2.5 justify-center items-center flex">
              <div className="flex h-[50px] items-center gap-2.5 w-full justify-between">
                {/* 이미지와 텍스트 그룹 */}
                <div className="flex items-center gap-2.5">
                  <img
                    className="w-[50px] h-[50px] rounded-[100px]"
                    src="https://via.placeholder.com/50x50"
                  />
                  <div className="text-black text-sm font-semibold font-['Inter'] leading-[19px]">
                    Zander 님이 회원님을 팔로우 하였습니다.
                  </div>
                </div>
                {/* 버튼 */}
                <Button
                  variant="contained"
                  sx={{
                    color: isHovered ? "#C96868" : "black", // hover 시 텍스트 색 변경
                    backgroundColor: "white", // hover 시 배경색 변경
                    fontWeight: "bold",
                    border: "1px solid black",
                    width: "100px",
                    marginLeft: "320px",
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

        {/* 반복되는 알림들 */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="self-stretch h-[70px] px-2.5 rounded-md flex-col items-start gap-2.5 flex"
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
                    <div className="text-black text-sm font-semibold font-['Inter'] leading-[19px]">
                      Zander 님이 좋아요를 눌렀습니다.
                    </div>
                    <Button
                      variant="contained"
                      sx={{
                        color: "#7EACB5", // hover 시 텍스트 색 변경
                        fontWeight: "bold",
                        background: "white",
                        border: "1px solid #7EACB5",
                        width: "100px",
                        marginLeft: "365px",
                      }}
                    >
                      팔로우
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
