"use client";

import { FC } from "react";
import Image from "next/image";

interface IProps {
  type?: string;
  icon?: string;
  text: string;
  value?: string;
  image?: string;
  onClick?: () => void;
}

const Chip: FC<IProps> = ({ type, icon, text, value, image, onClick }) => {
  if (type === "color") {
    return (
      <button
        className="flex h-[32px] w-[68px] items-center justify-center gap-[4px] rounded-[4px] border border-[#E8E8E8] p-[10px]"
        onClick={onClick}
      >
        <div className="h-[20px] w-[20px]">
          {image ? (
            <Image src={image} alt={"image"} width={20} height={20} />
          ) : (
            "loading"
          )}
        </div>
        <span className="whitespace-nowrap text-[14px] text-[#71717A]">
          {text}
        </span>
      </button>
    );
  } else if (type === "mood") {
    return (
      <button
        className="flex h-[32px]  w-[68px] items-center justify-center gap-[4px] rounded-[4px] border border-[#E8E8E8]"
        onClick={onClick}
      >
        <div className="h-[25px] w-[25px]">
          {image ? (
            <Image src={image} alt={"image"} width={25} height={25} />
          ) : (
            "loading"
          )}
        </div>
        <span className="whitespace-nowrap text-[14px] text-[#71717A]">
          {text}
        </span>
      </button>
    );
  }
};

export default Chip;
