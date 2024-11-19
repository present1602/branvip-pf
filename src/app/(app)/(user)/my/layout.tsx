import React from "react";
import { MyProfile } from "./MyProfile";
import Nav from "./Nav";
import MyMobileNav from "./MyMobileNav";


interface IProps {
  children: React.ReactNode;
}


export default function MypageLayout({ children }: IProps) {

  return (
    <>
      <div className="bg-surface-50 w-full">

        <div className="pc:container pc:flex pc:gap-10 py-24">
          <div className="sticky top-20 h-fit max-pc:hidden">
            <div className="border-2xl w-[300px] border border-surface-100 bg-white px-6 py-10 rounded-lg">
              <MyProfile />

              <div className="px-5">
                <div className="border-b mt-3 mb-3" />
              </div>

              <Nav />
            </div>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>

      <MyMobileNav />

    </>

  )
};

