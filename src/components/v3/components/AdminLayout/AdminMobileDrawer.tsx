"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Icon } from "@/components/ui";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/v3/components/sheet";

const AdminMobileDrawer = () => {
  const currentPath = usePathname();
  const session = useSession();
  const loggedIn = !!session.data?.user;


  const navItems = [
    {
      name: "어드민 홈",
      path: "/admin",
      incluedPaths: ["/admin"],
    },
    {
      name: "배너",
      path: "/admin/banner",
      incluedPaths: ["/admin/banner"],
    },
    {
      name: "로그아웃",
      path: "/logout",
      incluedPaths: ["/logout"],
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="w-10 h-10 flex justify-center items-center">
          <Icon name="Bars3Icon" size="lg" />
        </button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader></SheetHeader>
        <div className="flex flex-col divide-y divide-surface-100">
          <div className="h-6"></div>
          {navItems.map((item, index) => {
            const isActive =
              currentPath && (item.incluedPaths.includes(currentPath) || item.path === currentPath);
            const isMe = item.path === "/me";
            if (isMe && !loggedIn) return null;

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
    <>
      <Link
        href={path}
        className={cn(
          "text-black font-[17px] py-3",
          active && "font-bold text-surface-900",
        )}
      >
        <div className="flex items-center gap-2">
          <span>
            {name}
          </span>
        </div>
      </Link>
    </>
  );
}

export default AdminMobileDrawer