import Button from "../../../components/common/Button";
import { useEasterEgg, useTimeSetterStore } from "../../../store/store";
import AchieveSetModal from "./AchieveSetModal";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

export default function TopContents() {
  const isTimeSetterOpen = useTimeSetterStore(
    (state) => state.isTimeSetterOpen
  );
  const setIsTimeSetterOpen = useTimeSetterStore(
    (state) => state.setIsTimeSetterOpen
  );
  const handleNameClick = useEasterEgg((state) => state.handleNameClick);

  return (
    <article className="flex items-end mt-20">
      <h1 className="text-[50px] text-[#3E435D] mr-5 select-none">
        <span className="font-bold" onClick={handleNameClick}>
          조명
        </span>
        님, 오늘도 열공하세요!!
      </h1>

      <article className="relative">
        <Button
          size="xl"
          variant="todo"
          textSize="lg"
          className="text-[#7eacb5] w-fit font-semibold flex content-center"
          onClick={() => {
            setIsTimeSetterOpen();
          }}
        >
          {"오늘의 목표 설정하기"}
          <KeyboardArrowRightRoundedIcon
            style={{ fontWeight: "bolder", fontSize: "30px" }}
          />
        </Button>
        {isTimeSetterOpen ? (
          <div>
            <AchieveSetModal />
          </div>
        ) : null}
      </article>
    </article>
  );
}
