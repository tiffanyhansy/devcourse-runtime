import React, { useEffect, useRef, useState } from "react";
import TimeSetter from "../../../components/Mui/TimeSetter";
import { useTimerStore, useTimeSetterStore } from "../../../store/store";
import { t } from "i18next";
import { Alert } from "@mui/material";
// ref객체와 useEffect 활용해서 모달 외부 클릭시 모달 닫히는 이벤트핸들러 만들기
function refHandler(
  ref: React.RefObject<HTMLDivElement | null>,
  handler: (event: MouseEvent) => void
) {
  useEffect(() => {
    let isMaked = true;
    const listner = (event: MouseEvent) => {
      // Mui 시간설정 컴포넌트가 body 최하단에 생성돼서 ref객체 이외의 요소로 취급받아서 시간설정 버튼을 조작하다 컴포넌트가 통째로 unmount 되는 현상 있었음
      // body의 마지막 자식요소를 추적해 그 자식요소가 MuiDialog-root인 경우에 핸들러가 작동 안하도록 예외처리 함
      const bodyChild = document.body.lastChild as HTMLElement;
      if (
        document.body.childElementCount > 2 &&
        bodyChild.classList.contains("MuiDialog-root")
      ) {
        return;
      }
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      // 핸들러가 바로 작동돼서 모달창을 열어도 바로 닫히는 거였네.. 그래서 플래그(boolean 변수로 트리거 거는거)로 처음에 막음
      if (isMaked) {
        isMaked = false;
      } else {
        handler(event);
      }
    };
    document.addEventListener("click", listner);

    return () => {
      document.removeEventListener("click", listner);
    };
  }, [ref, handler]);
}

export default function AchieveSetModal() {
  const setIsTimeSetterOpen = useTimeSetterStore(
    (state) => state.setIsTimeSetterOpen
  );

  const selectDate = useTimeSetterStore((state) => state.selectDate);
  const selectHours = useTimeSetterStore((state) => state.selectHours);
  const selectMinuites = useTimeSetterStore((state) => state.selectMinuites);
  const selectSeconds = useTimeSetterStore((state) => state.selectSeconds);

  const setStaticHours = useTimerStore((state) => state.setStaticHours);
  const setStaticMinuites = useTimerStore((state) => state.setStaticMinuites);
  const setStaticSeconds = useTimerStore((state) => state.setStaticSeconds);

  // 모달 외부 버튼 핸들러
  const divRef = useRef<HTMLDivElement>(null);

  const handleIsTimeSetterOpen = () => {
    setIsTimeSetterOpen();
  };

  refHandler(divRef, handleIsTimeSetterOpen);
  // 모달 외부 버튼 핸들러

  const [showAlert, setShowAlert] = useState(false);

  // 알림 닫기 핸들러
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (!showAlert) return;
    const timer = setTimeout(() => {
      setShowAlert(false); // 에러 메시지 숨기기
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [showAlert]);

  return (
    <div
      ref={divRef}
      className="px-10 py-8 rounded-[10px] flex flex-col gap-[20px] items-center justify-center bg-white border border-[#DEE2E6] absolute top-[55px] z-40 shadow-xl"
    >
      <TimeSetter />
      {showAlert && (
        <Alert
          severity="error"
          onClose={handleCloseAlert}
          className="w-[350px]"
          sx={{
            fontFamily: "S-CoreDream-3Light",
          }}
        >
          목표 시간을 설정해주세요
        </Alert>
      )}
      <button
        className="w-[350px] h-[54px] rounded-[10px] bg-[#7EACB5] text-white hover:bg-[#90bdc7]"
        onClick={() => {
          if (!selectDate) {
            setShowAlert(true);
            return;
          }
          setStaticHours(selectHours);
          setStaticMinuites(selectMinuites);
          setStaticSeconds(selectSeconds);
          localStorage.setItem(
            "StaticTimerTime",
            JSON.stringify([selectHours, selectMinuites, selectSeconds])
          );
          setIsTimeSetterOpen();
        }}
      >
        {t("설정 완료!")}
      </button>
    </div>
  );
}
