import Button from "../common/Button";

interface LoginButtonProps extends React.ComponentProps<"button"> {
  value: string;
  size: "xl" | "xxl";
}

export default function SubmitButton({
  value,
  size,
  ...otherProps
}: LoginButtonProps) {
  return (
    <Button size={size} variant="primary" textSize="lg" {...otherProps}>
      {value}
    </Button>
  );
}
