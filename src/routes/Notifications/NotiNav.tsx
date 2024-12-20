import { useEffect, useState } from "react";
import Buttons from "../../components/common/SquareButton";
import { useNotificationsStore } from "../../store/notificationsStore";
import { t } from "i18next";

export default function NotiNav() {
  const { isSeen, isNseenList, getNotificationList, update } =
    useNotificationsStore();
  const [init, setInit] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(true);

  // 전체 / 읽지 않음 구분 상태
  const isActive = () => {
    setActive(() => !active);
  };

  // 전체 리스트 보기
  const isYseenList = () => {
    getNotificationList!();
  };

  // 모두 읽음 클릭시 읽음처리 실시간 반영을 위한 처리
  useEffect(() => {
    // 초기실행 방지지
    if (init) {
      setInit(false);
      return;
    }
    getNotificationList!();
  }, [update]);

  return (
    <div className="flex justify-between w-4/6">
      <div className="flex gap-2 mb-4">
        <Buttons
          variant="primary"
          size="xs"
          textSize="sm"
          className="font-normal hover:bg-[#96ccd6]"
          style={{
            backgroundColor: active === true ? "#7EACB5" : "#e5e7eb",
          }}
          onClick={() => {
            isActive();
            isYseenList();
          }}
        >
          {t("전체")}
        </Buttons>

        <Buttons
          variant="primary"
          size="xs"
          textSize="sm"
          className="font-normal hover:bg-[#96ccd6]"
          style={{
            backgroundColor: active === false ? "#7EACB5" : "#e5e7eb",
          }}
          onClick={() => {
            isActive();
            isNseenList!();
          }}
        >
          {t("읽지 않음")}
        </Buttons>
      </div>
      <span className="cursor-pointer" onClick={() => isSeen!()}>
        {t("모두 읽음")}
      </span>
    </div>
  );
}
