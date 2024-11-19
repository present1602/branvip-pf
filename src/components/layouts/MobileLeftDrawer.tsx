"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { Icon } from "../ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function MobileLeftDrawer() {
  const currentPath = usePathname();
  const session = useSession();
  const loggedIn = !!session.data?.user;
  let adminIn:boolean = false


  const navItems = [
    {
      name: "로고 검색",
      path: "/moods",
      incluedPaths: ["/trademarks"],
    },
    {
      name: "비용 안내",
      path: "/pricing",
      incluedPaths: ["/pricing"],
    },
    {
      name: "마이페이지",
      path: "/me",
      incluedPaths: ["/me"],
    },
    {
      name: "문의 하기",
      path: "/inquiry",
      incluedPaths: ["/inquiry"],
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <Icon name="Bars3Icon" size="lg" />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader></SheetHeader>
        <div className="flex flex-col divide-y divide-surface-100">
          {navItems.map((item, index) => {
            const isActive =
              currentPath && (item.incluedPaths.includes(currentPath) || item.path === currentPath);
            const isMe = item.path === "/me";
            if (isMe && !loggedIn) return null;
            const isAdmin = item.path === "/admin";
            if (isAdmin && !adminIn) return null;

            return (
              <NavItem
                key={index}
                name={item.name}
                path={item.path}
                active={isActive ? isActive : false}
              />
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface INavItem {
  name: string;
  path: string;
  active?: boolean;
}

function NavItem({ name, path, active }: INavItem) {
  return (
    <Link
      href={path}
      className={cn(
        "py-6 text-lg font-medium text-surface-500 transition-colors",
        active && "font-bold text-surface-900"
      )}
    >
      {name}
    </Link>
  );
}
