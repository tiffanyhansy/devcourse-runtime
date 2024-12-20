import React from "react";
interface PostButtonProps {
  icon?: string | React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: React.ReactNode;
  otherProps?: any;
}

export default function PostButton({
  onClick,
  icon,
  className,
  children,
  ...otherProps
}: PostButtonProps) {
  return (
    <button
      className={`w-[52px] h-[52px] rounded-full bg-white ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
