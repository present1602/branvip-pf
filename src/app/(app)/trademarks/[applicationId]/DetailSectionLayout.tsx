import { cn } from "../../../../lib/utils";
import React from "react";

interface IDetailSectionLayoutProps {
  title: string;
  primary?: string;
  children?: React.ReactNode;
  scroll?: boolean;
}

export function DetailSectionLayout({
  title,
  primary,
  children,
  scroll,
}: IDetailSectionLayoutProps) {
  return (
    <div className="grid gap-4">
      <h5 className="flex gap-2 text-lg font-bold">
        <span className="whitespace-nowrap text-surface-900">{title}</span>
        {primary && <span className="text-primary-500">{primary}</span>}
      </h5>
      {!!children && (
        <div
          className={cn(
            "rounded-2xl border border-surface-200 p-6",
            scroll && "overflow-y-auto max-pc:max-h-[264px]"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
