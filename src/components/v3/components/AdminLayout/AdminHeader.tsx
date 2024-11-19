import Image from "next/image";
import React, { FC } from "react";
import Link from "next/link";
import BeforeBtn from "@/components/v3/components/GNB/BeforeBtn";
import AdminLoginBtn from "@/components/v3/components/AdminLayout/AdminLoginBtn";


interface IProps {
  isBeforeBtn?: boolean;
}

const  AdminHeader: FC<IProps> = ({ isBeforeBtn }) => {

  return (
    <>
      <div
        className="sticky top-0 z-40 h-[60px] xl:h-[60px] flex HD_bg  pl-[20px] xl:px-[100px] 2xl:px-[320px]">
        {/*mobileTop*/}
        <div className="flex justify-between w-full">
          {/*로고*/}
          <div className="flex items-center gap-[10px]">
            {isBeforeBtn && (
              <div className="xl:hidden">
                <BeforeBtn />
              </div>
            )}
            <div>
              <Link href={"/"}>
                <Image src="/renewal/assets/svg/logo/branvip-logo.svg" alt="logo" width={83} height={24} />
              </Link>

            </div>
            <div>
              <span className="text-primary_scale-300 text-[18px]">
              Admin
            </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {/*로그인버튼*/}
            <div>
              <AdminLoginBtn />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;