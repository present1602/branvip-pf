import { GhostButton, Icon } from "../../ui";
import { cn } from "../../../lib/utils";
import Link from "next/link";
import React from "react";

interface IMypageLayoutProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  subText?: string;
  previousUrl?: string;
  previousTitle?: string;
}
export function MyPageLayout({
  title,
  action,
  children,
  subText,
  previousUrl,
  previousTitle,
}: IMypageLayoutProps) {
  const extended = !!(previousUrl && previousTitle);

  return (
    <div
      className={cn(
        "max-pc:px-4 max-pc:py-6 pc:gap-2 pc:pt-8",
        extended && "border-b border-surface-200 max-pc:p-4 pc:py-8"
      )}
    >
      {/* Desktop Only */}
      {extended && (
        <Link
          href={previousUrl}
          className="mb-4 flex gap-1 text-primary-500 max-pc:hidden"
        >
          <Icon name="ArrowLeftIcon" size="md" />
          <GhostButton
            underline
            className="text-primary-500 hover:text-primary-600"
          >
            {previousTitle}
          </GhostButton>
        </Link>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-2">
          <h1 className="truncate text-xl font-bold text-surface-700 pc:text-3xl">
            {title}
          </h1>
          {subText && (
            <p className="text-sm font-medium text-surface-500">{subText}</p>
          )}
        </div>
        {action && <div className="whitespace-nowrap">{action}</div>}
      </div>
      <main className="min-h-screen py-6">{children}</main>
    </div>
  );
}
