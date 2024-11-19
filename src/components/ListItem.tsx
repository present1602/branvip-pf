import { cn } from "../lib/utils";
import React from "react";

interface IListItemProps {
  title: string;
  children?: React.ReactNode;
  text?: string;
  textOnly?: boolean;
}

export default function ListItem({
  title,
  children,
  text,
  textOnly,
}: IListItemProps) {
  const hasValue = text?.trim() !== "";

  return (
    <li className="flex gap-4">
      <div
        className={cn(
          "w-[72px] font-medium text-surface-500",
          text && "text-surface-400"
        )}
      >
        {title}
      </div>
      <div className={cn("flex-1", text && "font-medium text-surface-600")}>
        {textOnly ? (hasValue ? text : "-") : children}
      </div>
    </li>
  );
}
