import Button from "../common/Button";

type LoginButtonProps = {
  value: string;
  onClick: () => void;
  size: "xl" | "xxl";
};

export default function LoginButton({ value, onClick, size }: LoginButtonProps) {
  return (
    <Button size={size} variant="primary" textSize="lg" onClick={onClick}>
      {value}
    </Button>
  );
}
