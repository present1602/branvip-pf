import { cn } from "../../../lib/utils";
import React from "react";

interface IProps {
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
  htmlId?: string;
  hidden?: boolean;
}

export function PricingStepLayout({
  step,
  title,
  description,
  children,
  htmlId,
}: IProps) {
  return (
    <div
      className={cn(
        "grid gap-8 rounded-2xl bg-surface-50 p-6 pc:gap-10 pc:p-10"
      )}
      id={htmlId}
    >
      <div className="grid gap-2">
        <h5 className="text-4xl font-black text-primary-500">{step}</h5>
        <h3 className="text-xl font-bold text-surface-900">{title}</h3>
        {description && (
          <p className="whitespace-pre-line text-base text-surface-500">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
