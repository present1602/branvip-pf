import Image from "next/image";
import React from "react";

interface IProps {
  title: string;
  subTitle?: string;
  imageUrl?: string;
}

export function TrademarkSummaryTag({ title, subTitle, imageUrl }: IProps) {
  return (
    <div className="flex w-fit gap-1 rounded-lg bg-slate-50 px-2 py-1 text-sm font-medium">
      {subTitle && (
        <span className=" whitespace-nowrap text-surface-400">{subTitle}</span>
      )}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="tag"
          className="h-5 w-5 rounded-sm"
          width={20}
          height={20}
        />
      )}
      <span className="break-keep text-surface-600">{title}</span>
    </div>
  );
}
