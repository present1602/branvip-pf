import React from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
}

export function Select(props: SelectProps) {
  const { children, disabled, placeholder } = props;

  return (
    <div
      aria-disabled={disabled}
      className={twMerge(
        "relative rounded-2xl bg-white p-4 text-surface-900 ring-1 ring-inset ring-surface-200",
        disabled && "bg-surface-100 text-surface-400 ring-0"
      )}
    >
      <select
        name=""
        className="h-full w-full bg-transparent"
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled className="hidden">
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <Icon
        name="ChevronDownIcon"
        size="lg"
        className="pointer-events-none absolute inset-y-4 right-4"
      />
    </div>
  );
}
