"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IAsignProduct } from "@/interfaces";

interface IAssignBtnProps {
  assignProduct: IAsignProduct;
}

const AssignBtn: React.FC<IAssignBtnProps> = ({ assignProduct }) => {
  const router = useRouter();

  return (
    <button
      className="flex flex-col items-center justify-center rounded-[4px] border border-gray_scale-80 bg-gray_scale-20 p-[6px]"
      onClick={() => {
        router.push(`/logosearch?product_type=${assignProduct.mainCode[0]}`);
      }}
    >
      <span className="text-[12px] text-gray_scale-600">
        {assignProduct.productName}
      </span>
      <span className="text-[12px] text-gray_scale-200">
        {assignProduct.subCode}
      </span>
    </button>
  );
};

export default AssignBtn;
