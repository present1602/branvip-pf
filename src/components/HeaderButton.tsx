"use client";
import React from "react";
import { IMenuItemsProps } from "@/components/v3/components/GNB/Header";
import { useRouter } from "next/navigation";

interface IHeaderButtonProps {
  item: IMenuItemsProps;
  pathname: string;
}

const HeaderButton: React.FC<IHeaderButtonProps> = ({ item, pathname }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(item.link);
  };

  return (
    <button
      className="min-w-[61px] border-primary_scale-300 hover:border-b"
      onClick={handleClick}
    >
      <span
        className={
          item.link == pathname ? "font-semibold text-primary_scale-300" : ""
        }
      >
        {item.label}
      </span>
    </button>
  );
};

export default HeaderButton;
