"use client";

import React, { FC } from "react";
import { usePathname } from "next/navigation";
import LoginBtn from "@/components/v3/components/GNB/LoginBtn";
import HeaderButton from "@/components/HeaderButton";
import { IMenuItemsProps } from "@/components/v3/components/GNB/Header";

interface IProps {
  firstMenu: any;
  secondMenu: any;
}

const HeaderMenu: FC<IProps> = ({ firstMenu, secondMenu }) => {
  const pathname = usePathname();

  return (
    <div
      className="flex h-[60px] items-center gap-[50px] overflow-x-auto pl-[20px] scrollbar-hide xl:w-full xl:justify-between xl:gap-0 xl:overflow-x-hidden xl:pl-[80px] xl:text-lg
        xl:scrollbar-default"
    >
      <div className="flex gap-[50px]">
        {firstMenu.map((item: IMenuItemsProps, index: number) => (
          <HeaderButton key={index} item={item} pathname={pathname || ""} />
        ))}
      </div>

      <div className="flex gap-[50px]">
        {secondMenu.map((item: IMenuItemsProps, index: number) => (
          <HeaderButton key={index} item={item} pathname={pathname || ""} />
        ))}
        <div className="hidden min-w-[61px] xl:inline">
          <LoginBtn />
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
