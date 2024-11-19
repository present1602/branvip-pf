"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { TMProps } from "@/app/(app)/trademark/[applicationId]/TMInfo";

const TMDetailProduct: FC<TMProps> = ({ tm }) => {
  const router = useRouter();
  const sectors: unknown[] = [
    ...new Set(tm.asignProduct.map((item: any) => item.mainCode[0])),
  ];

  return (
    <div className="flex flex-col xl:w-[1240px] xl:flex-row xl:items-center xl:rounded-[10px] xl:border xl:px-10 xl:py-5">
      <span className="text-[18px] font-semibold xl:w-[70px] xl:text-[15px] xl:text-gray_scale-500">
        업종
      </span>
      <div className="mt-[12px] flex flex-wrap gap-[10px] rounded-[10px] border border-gray_scale-90 p-[10px] xl:mt-0 xl:border-0">
        {sectors?.map((text, index) => (
          <button
            key={index}
            className="flex h-[28px] items-center justify-center rounded-[4px] border border-gray_scale-80 bg-gray_scale-20 px-[6px] text-[14px] text-gray_scale-500"
            onClick={() => {
              router.push(`/logosearch?product_type=${text}`);
            }}
          >
            {`제${String(text)}류`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TMDetailProduct;
