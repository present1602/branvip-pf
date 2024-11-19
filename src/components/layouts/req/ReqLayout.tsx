"use client";

import React, { FC } from "react";
import { Progress } from "@nextui-org/react";
import QuoteNav from "@/app/(app)/(user)/req/init/QuoteNav";

interface IReqLayoutProps {
  children: React.ReactNode;
  label: string;
  subLabel?: string;
  nextUrl?: string;
  actBtn?: React.ReactNode;
  maxStep?: number;
  nowStep?: number;
  btn?: React.ReactNode;
}

const ReqLayout: FC<IReqLayoutProps> = ({
  children,
  label,
  subLabel,
  actBtn,
  maxStep = 1,
  nowStep = 0,
  btn,
}) => {
  const value = (100 / maxStep) * nowStep;
  return (
    <div className="flex min-h-[600px] flex-col xl:flex-row xl:gap-[51px]">
      <div className="flex w-[335px] flex-col xl:w-[900px]">
        <div className="flex items-center gap-[11px]">
          <Progress
            size="sm"
            value={value}
            classNames={{
              indicator: "bg-primary_scale-70",
            }}
          />
          <div className="text-[11px] xl:text-[14px] ">
            {nowStep}/{maxStep}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2.5 pt-[30px]">
          <div className="flex items-center gap-10">
            <div className="heading2 xl:title1 text-center">{label}</div>
            {btn && <div>{btn}</div>}
          </div>
          <div className="text2-bold xl:heading3 text-center text-gray_scale-300">
            {subLabel}
          </div>
        </div>
        {children}
      </div>
      <div className="xl:w-[330px]">
        <div className="fixed flex flex-col">
          <QuoteNav actBtn={actBtn} />
        </div>
      </div>
    </div>
  );
};

export default ReqLayout;
