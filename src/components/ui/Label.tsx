import React from "react";
import { twMerge } from "tailwind-merge";

export interface LabelProps {
  label: string;
  guideText?: string;
  direction?: "top" | "left" | "right";
  children: React.ReactNode;
  className?: string;
  required?: Boolean;
}

export function Label({ direction = "top", required, ...props }: LabelProps) {
  const { label, guideText, children, className } = props;

  const directionClass = {
    top: "flex-col",
    left: "flex-row justify-between",
    right: "justify-between flex-row-reverse",
  };

  return (
    <div
      className={twMerge(
        "flex w-full gap-2",
        directionClass[direction],
        className
      )}
    >
      <div className="pointer-events-none">
        <div className="mb-0.5 font-medium text-surface-900">{label} {required && <span className="text-red-400">*</span>} </div>
        {guideText && (
          <div className="whitespace-pre-line text-sm text-surface-400">
            {guideText}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
