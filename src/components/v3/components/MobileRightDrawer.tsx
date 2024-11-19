"use client";

import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {useSession} from "next-auth/react";
import {Sheet, SheetContent, SheetHeader, SheetTrigger} from "../components/sheet";
import {Icon} from "@/components/ui";
import Image from "next/image";
import * as SheetPrimitive from "@radix-ui/react-dialog";

export function MobileRightDrawer() {
    const currentPath = usePathname();
    const session = useSession();
    const loggedIn = !!session.data?.user;
    let adminIn: boolean = false;

    const navItems = [
        {
            name: "마이페이지",
            path: "/my/info/user",
            incluedPaths: ["/my/info/user"],
            image: "/renewal/assets/svg/icons/h-2.svg"
        },
        {
            name: "로그아웃",
            path: "/logout",
            incluedPaths: ["/logout"],
            image: "/renewal/assets/svg/icons/h-1.svg"
        },
    ];
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="w-10 h-10 flex justify-center items-center">
                    <Icon name="Bars3Icon" size="lg"/>
                </button>
            </SheetTrigger>

            <SheetContent side="right">
                <SheetHeader></SheetHeader>
                <div className="flex flex-col divide-y divide-surface-100">
                    <div className="h-6"></div>
                    {navItems.map((item, index) => {
                        // const isActive =
                        // currentPath && (item.incluedPaths.includes(currentPath) || item.path === currentPath);
                        // const isMe = item.path === "/me";
                        // if (isMe && !loggedIn) return null;
                        const isAdmin = item.path === "/admin";
                        if (isAdmin && !adminIn) return null;

                        return (
                            <NavItem
                                key={index}
                                name={item.name}
                                image={item.image}
                                path={item.path}
                                // active={isActive ? isActive : false}
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
    image: string;
}

function NavItem({name, path, active, image}: INavItem) {

    const router = useRouter();
    const handleClick = () => {
        router.push(path)
    }
    return (
        <>
            <SheetPrimitive.Close>
                <div
                    onClick={handleClick}
                    className={cn(
                        "py-6 text-lg font-medium text-surface-500 transition-colors",
                        active && "font-bold text-surface-900",
                    )}
                >

                    <div className="flex items-center gap-2">
                        <div>
                            <Image src={image} alt={'1'} width={24} height={24}/>
                        </div>
                        <span>
            {name}
          </span>
                    </div>
                </div>
            </SheetPrimitive.Close>

        </>
    );
}
