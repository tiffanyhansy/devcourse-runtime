import Button from "../../../../components/common/SquareButton";

type buttonProps = {
  icon: string;
  title: string;
  onClick?: () => void;
};
export default function LinkButton({ icon, title, onClick }: buttonProps) {
  return (
    <>
      <Button
        size="sm" // 버튼 크기 설정
        variant="custom" // 사용자 정의 스타일
        textSize="sm" // 텍스트 크기
        className="w-20 h-20 p-2 bg-[#D5E6E9] flex flex-col gap-[4px] items-center justify-center" // 추가적인 스타일
        onClick={onClick}
      >
        <img src={icon} alt={"게시판 버튼 로고"} />
        <p className="text-[0.75rem] font-semibold text-[#374B4F]">{title}</p>
      </Button>
    </>
  );
}
