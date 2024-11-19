import React from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  boxClassName?: string;
}

export function CheckboxInquiry({
  value,
  boxClassName,
  ...props
}: CheckboxProps) {
  return (
    <div className={cn("relative h-10 w-24 overflow-hidden", boxClassName)}>
      <input
        {...props}
        aria-label="check"
        id="type"
        type="checkbox"
        value={value}
        className="peer h-full w-full appearance-none rounded-lg ring-1 ring-inset ring-surface-300 transition-colors checked:bg-primary-400  checked:ring-0 hover:bg-primary-50 checked:hover:bg-primary-300"
      />
      <span className="pointer-events-none absolute inset-0 m-auto flex items-center justify-center text-center text-gray-800 peer-checked:text-white">
        {value}
      </span>
    </div>
  );
}
