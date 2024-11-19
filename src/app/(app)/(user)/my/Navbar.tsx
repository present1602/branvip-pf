"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface IProps {
  trademarkCount: number;
  boardCount: number;
  orderCount: number;
}

export function Navbar({ trademarkCount, boardCount, orderCount }: IProps) {
  const pathname = usePathname();

  const navItems: INavItemProps[] = [
    {
      name: "내 상표",
      value: trademarkCount,
      href: "/me/trademarks",
      isActive: pathname === "/me/trademarks",
    },
    {
      name: "문의내역",
      value: boardCount,
      href: "/me/boards",
      isActive: pathname === "/me/boards",
    },
    {
      name: "결제내역",
      value: orderCount,
      href: "/me/orders",
      isActive: pathname === "/me/orders",
    },
    {
      name: "출원인 정보",
      href: "/me/applicant",
      isActive: pathname === "/me/applicant",
    },
  ];

  return (
    <div>
      {/* mobile Navbar Tabs*/}
      <div className="pc:hidden">
        <div className="flex overflow-x-auto bg-white">
          {navItems.map((item) => (
            <MobileNavTab key={item.href} {...item} />
          ))}
        </div>
      </div>

      <div className="max-pc:hidden">
        <div className="my-6 h-px w-full bg-slate-200" />
        <div className="grid gap-2">
          {navItems.map((item) => (
            <DesktopNavItem key={item.href} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface INavItemProps {
  name: string;
  value?: number;
  href: string;
  isActive: boolean;
}

function DesktopNavItem({ name, value, href, isActive }: INavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex gap-2.5 rounded-md p-4 font-bold text-surface-500 transition-colors hover:bg-surface-100",
        isActive && "bg-surface-200 hover:bg-surface-200"
      )}
    >
      <span>{name}</span>
      {!!value && <span className="font-black">{value}</span>}
    </Link>
  );
}

function MobileNavTab({ name, value, href, isActive }: INavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex gap-1 whitespace-nowrap  border-b border-surface-300 p-4 text-surface-300",
        isActive && "border-b-2 border-primary-500 text-primary-500"
      )}
    >
      <span className="font-bold">{name}</span>
      {!!value && <span className="font-black">{value}</span>}
    </Link>
  );
}
