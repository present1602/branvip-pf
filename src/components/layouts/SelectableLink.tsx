"use client";

import { cn } from "../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ILink {
  label: string;
  href: string;
  children?: React.ReactNode;
  activeFirstPaths?: string[];
}

export function SelectableLink({
                                 label,
                                 href,
                                 children,
                                 activeFirstPaths,
                               }: ILink) {
  const currentPath = usePathname();
  const isActive = currentPath ?
    currentPath === href ||
    (activeFirstPaths && activeFirstPaths.includes(currentPath)) ||
    (activeFirstPaths &&
      activeFirstPaths.some((path) => currentPath.startsWith(path))) : "";

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 border-b-4 border-b-transparent px-2 py-5 text-lg font-medium text-surface-500 transition-colors hover:text-primary-500",
        isActive && "border-primary-500 text-primary-500",
      )}
    >
      <span>{label}</span>
      {children && <div>{children}</div>}
    </Link>
  );
}
