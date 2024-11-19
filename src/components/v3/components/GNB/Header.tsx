import BeforeBtn from "@/components/v3/components/GNB/BeforeBtn";
import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";
import HeaderMenu from "@/components/v3/components/GNB/HeaderMenu";
import LoginBtn from "@/components/v3/components/GNB/LoginBtn";

export interface IMenuItemsProps {
  label: string;
  link: string;
}

const Header: React.FC = () => {
  const menuItems: IMenuItemsProps[] = [
    { label: "로고검색", link: "/logosearch" },
    { label: "의뢰하기", link: "/allinone/check" },
    { label: "비용안내", link: "/pricing" },
    { label: "문의하기", link: "/inquiry" },
  ];

  const firstMenu = menuItems.filter((item, index) => index < 3);
  const secondMenu = menuItems.filter((item, index) => index >= 3);

  return (
    <div className="HD_bg sticky top-0 z-40 flex h-[116px] flex-col pl-[20px] xl:h-[60px]  xl:flex-row xl:px-[100px] 2xl:px-[320px]">
      <div className="flex h-[56px] items-center justify-between py-[12px]">
        <div className="flex items-center gap-[10px]">
          <div className="xl:hidden">
            <BeforeBtn />
          </div>
          <Link href={"/"}>
            <Image
              src="/renewal/assets/svg/logo/branvip-logo.svg"
              alt="logo"
              width={83}
              height={24}
            />
          </Link>
        </div>
        <div className="flex items-center xl:hidden">
          <Suspense fallback={<div>loading</div>}>
            <LoginBtn />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<div>loading</div>}>
        <HeaderMenu firstMenu={firstMenu} secondMenu={secondMenu} />
      </Suspense>
    </div>
  );
};

export default Header;
