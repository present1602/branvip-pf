import { cn } from "@/lib/utils";
import React from "react";

interface IProcessCardProps {
  date: string;
  title: string;
  state: string;
  last?: boolean;
}

export function ProcessCard({ date, title, state, last }: IProcessCardProps) {
  return (
    <div className="flex gap-4">
      <div className="relative grid w-3">
        <div
          className={cn(
            "h-3 w-3 rounded-full bg-surface-300",
            last && "animate-ping bg-primary-500"
          )}
        />
        {last && (
          <div className="absolute left-0 top-0 h-3 w-3 rounded-full bg-primary-500" />
        )}
        {!last && <div className="mx-auto h-[100px] w-px bg-surface-300" />}
      </div>

      <div className="grid gap-1 pb-6">
        <span className="text-sm font-medium text-surface-400">{date}</span>
        <span className="font-bold text-surface-700">{title}</span>
        <span className="font-bold text-surface-400">{state}</span>
      </div>
    </div>
  );
}
