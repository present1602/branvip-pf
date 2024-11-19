"use client"
import { Button as BTN } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { BtnType } from "@/app/(app)/(auth)/signup/SignUp";

interface IProps{
  size?: string;
  type?:BtnType | undefined
  children?: ReactNode;
  bg_color?: string;
  width? :number;
  height? :number;
  onClick? : () => void;
  onKeyDown? : (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const Button = ({ size = "M", type ="default", children, bg_color, width,height , ...restProps}: IProps) => {
  const isDisabled = type === "readonly";  // readonly일 때 disabled 상태 활성화


  const sizeClasses = {
    L: "px-[28px] py-[16px] flex justify-center items-center rounded-[10px]",
    M: "px-[20px] py-[12px] flex justify-center items-center rounded-[4px]",
    S: "px-[18px] py-[10px] flex justify-center items-center rounded-[4px]",
  };

  const typeClasses = {
    green: "bg-primary_scale-70",
    white: "bg-white border border-primary_scale-70",
    default: "bg-white border border-warm_gray_scale-30",
    readonly: "bg-gray_scale-50",
    ai: "bg-primary_scale-10 border border-primary_scale-20",
  };


  let widthClasses = 'w-full'
  if(width){
    widthClasses = `w-[${width}px]`
  }
  let heightClasses = 'h-full'
  if(height){
    heightClasses = `h-[${height}px]`
  }
  const buttonClasses = `${sizeClasses[size as keyof typeof sizeClasses]} ${typeClasses[type as keyof typeof typeClasses]} ${widthClasses} ${heightClasses}`;

  return (<>
      <BTN  className={`${buttonClasses}`} disabled={isDisabled} {...restProps}>
        {children}
      </BTN>
    </>

  );

};

export default Button;