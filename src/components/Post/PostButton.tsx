import React from "react";

interface PostButtonProps {
  icon: string | React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean; // disabled 속성 추가 (옵셔널)
}

export default function PostButton({
  onClick,
  icon,
  className,
  disabled,
}: PostButtonProps) {
  return (
    <button
      className={`w-[52px] h-[52px] rounded-full bg-white ${className}`}
      disabled={disabled} // disabled 속성 적용
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
