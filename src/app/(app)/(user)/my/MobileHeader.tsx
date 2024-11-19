"use client";

import React from "react";
import { MyProfile } from "./MyProfile";
import { Navbar } from "./Navbar";
import { usePathname } from "next/navigation";

/* 현재는 안쓰는 파일일 수도 있음 */
interface IUser {
  id: string;
  phoneNumber: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
interface IProps {
  name: string;
  boardCount: number;
  orderCount: number;
  trademarkCount: number;
  user: IUser
}

export default function MobileHeader({
  name,
  boardCount,
  orderCount,
  trademarkCount,
  user
}: IProps) {
  const pathName = usePathname()
  const isDetailPage = (pathName ?? "").split("/").length > 3;

  if (isDetailPage) return null;

  return (
    <div className="pc:hidden">
      <div className="container py-2">
        <MyProfile />
      </div>
      <Navbar
        boardCount={boardCount}
        orderCount={orderCount}
        trademarkCount={trademarkCount}
      />
    </div>
  );
}
