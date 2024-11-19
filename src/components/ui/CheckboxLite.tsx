import React from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  boxClassName?: string;
}

export function CheckboxLite({ boxClassName, ...props }: CheckboxProps) {
  return (
    <div className={cn("relative h-8 w-8 overflow-hidden", boxClassName)}>
      <input
        {...props}
        type="checkbox"
        aria-label="check"
        className="peer h-full w-full appearance-none rounded-lg ring-1 ring-inset ring-surface-300 transition-colors checked:bg-primary-400 checked:ring-0 hover:bg-primary-50 checked:hover:bg-primary-600"
      />
      <Icon
        name="CheckIcon"
        size="md"
        className="pointer-events-none absolute inset-0 m-auto hidden text-white peer-checked:block"
      />
    </div>
  );
}
