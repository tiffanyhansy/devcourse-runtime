import Button from "../common/Button";

type LoginButtonProps = {
  value: string;
  onClick: () => void;
};

export default function LoginButton({ value, onClick }: LoginButtonProps) {
  return (
    <Button size="xl" variant="primary" textSize="lg" onClick={onClick}>
      {value}
    </Button>
  );
}
