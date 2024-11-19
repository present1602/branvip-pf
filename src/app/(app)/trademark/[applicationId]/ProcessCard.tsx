import React, { FC } from "react";
import { cn } from "@/lib/utils";

interface IProcessCardProps {
  date: string;
  title: string;
  state: string;
  last?: boolean;
}
const ProcessCard:FC<IProcessCardProps> = ({ date, title, last }) => {
  return (
    <div className="flex gap-4">
      <div className="relative grid w-3">
        <div
          className={cn(
            "h-3 w-3 rounded-full bg-primary_colorless-100",
            last && "animate-ping bg-[#0AB173]"
          )}
        />
        {last && (
          <div className="absolute left-0 top-0 h-3 w-3 rounded-full bg-[#0AB173]" />
        )}
        {!last && <div className="flex flex-col items-center space-y-2 h-[60px] mt-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-1 h-1 bg-surface-300 rounded-full"></div>
          ))}
        </div>}
      </div>

      <div className="grid gap-1 pb-6">
        <span className="text-[13px] text-gray_scale-800">{date}</span>
        <span className="text-[15px] font-bold text-gray-800">{title}</span>
        {/*<span className="text-[15px] font-bold text-gray-400">{state}</span>*/}
      </div>
    </div>
  )
}

export default ProcessCard