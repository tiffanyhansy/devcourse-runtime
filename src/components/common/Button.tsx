import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ComponentProps<"button"> {
  size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  variant: "primary" | "secondary" | "todo" | "custom" | "outline";
  textSize: "sm" | "smd" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant,
  size,
  children,
  textSize,
  className,
  ...otherProps
}: ButtonProps) {
  const buttonVar = {
    primary: "bg-[#7EACB5] text-[#ffffff]",
    secondary: "bg-[#D6D6D6] text-black",
    outline:
      "bg-[#ffffff] text-[#7EACB5] border-2 border-[#7EACB5] solid hover:border-[#96ccd6] hover:text-[#96ccd6]",
    todo: "bg-[#ffffff] text-black",
    custom: "",
  };
  const buttonSize = {
    xxs: "w-[64px] h-[32px]",
    xs: "w-[100px] h-[40px]",
    sm: "w-[130px] h-[48px]",
    md: "w-[160px] h-[48px]",
    lg: "w-[250px] h-[70px]",
    xl: "w-[384px] h-[52px]",
    xxl: "w-[384px] h-[64px]",
  };
  const buttonTextSize = {
    sm: "text-[16px]",
    smd: "text-[18px]",
    md: "text-[20px]",
    lg: "text-[24px]",
  };

  return (
    <button
      {...otherProps}
      className={cn(
        "text-md font-semibold text-white bg-[#7EACB5] rounded-[10px] focus:outline-none w-[160px] h-[48px] flex items-center justify-center",
        buttonVar[variant],
        buttonSize[size],
        buttonTextSize[textSize],
        className
      )}
    >
      {children}
    </button>
  );
}
