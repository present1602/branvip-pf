"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { IViennaCodeInfo } from "@/interfaces";

interface ViennaBtnProps {
  vienna: IViennaCodeInfo;
}

const ViennaBtn: FC<ViennaBtnProps> = ({ vienna }) => {
  const router = useRouter();

  return (
    <button
      className="flex h-[28px] max-w-[300px] items-center overflow-x-auto whitespace-nowrap rounded-[4px] border border-gray_scale-80 bg-gray_scale-20 px-[6px] text-[14px]  text-gray_scale-500 scrollbar-hide"
      onClick={() => {
        router.push(
          `/logosearch?vienna_code=${vienna.viennaCode[0].slice(0, 2) + "0000"}`
        );
      }}
    >
      {vienna.viennaCodeDescription[0] ?? ""}
    </button>
  );
};

export default ViennaBtn;
