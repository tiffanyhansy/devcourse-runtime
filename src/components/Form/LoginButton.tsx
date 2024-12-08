type LoginButtonProps = {
  value: string;
  onClick?: () => void;
};

export default function LoginButton({ value }: LoginButtonProps) {
  return (
    <button className="w-96 h-16 bg-[#7EACB5] rounded-[10px] font-bold text-2xl text-white">
      {value}
    </button>
  );
}
