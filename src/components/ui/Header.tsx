import React from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  leading?: React.ReactNode;
  title?: React.ReactNode;
  actions?: React.ReactNode[] | React.ReactNode;
  className?: string;
}

export function Header(props: HeaderProps) {
  const { leading, title, actions, className } = props;

  return (
    <div
      className={twMerge(
        "sticky top-0 z-50 border-b border-surface-100 bg-white p-4 pb-[15px] pc:px-10",
        className
      )}
    >
      <section className="grid grow-0 grid-cols-[1fr_auto_1fr] items-center gap-x-6 pc:px-4">
        <div>{leading}</div>
        <div className="place-self-stretch overflow-hidden overflow-ellipsis whitespace-nowrap font-bold">
          {title}
        </div>
        <nav className="flex items-center justify-end gap-4 place-self-stretch">
          {actions}
        </nav>
      </section>
    </div>
  );
}
