"use client";

import React, { FC, useEffect, useState } from "react";
import { getServerUser } from "@/actions/authAction";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import AdminMobMenu from "@/app/admin/AdminMobMenu";

const AdminLoginBtn: FC = () => {
  const [user, setUser] = useState<{ id: string; phoneNumber: string; } | any>(undefined);
  const [current, setCurrent] = useState("");
  const session = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    setUser({ image: "", name: "로딩중" });

    async function fetchUser() {
      const users = await getServerUser();
      setUser(users);
    }

    fetchUser();
  }, []);

  // 로그인시 callBackUrl 무결성을 위한 함수
  useEffect(() => {
    if (pathname == "/login") {
      setCurrent(searchParams?.get("callBackUrl") ?? "/");
    } else if (pathname) {
      setCurrent(pathname);
    } else {
      setCurrent("/");
    }
  }, [pathname, searchParams]);


  if (session.status === "authenticated") {
    return (
      <div className="flex items-center">
        <div className="xl:hidden">
          <AdminMobMenu/>
        </div>
        <Link href={"/me/trademarks"} className="hidden xl:inline">
          <div className="h-1 flex items-center gap-3">
            <span className="text-[16px] text-primary_scale-300 font-semibold">
              브랜빕 관리자 님
            </span>
              <Button className="HD_btn w-[80px]" onClick={() => signOut({callbackUrl:'/'})}>
                <span className="HD_btn_text">로그아웃</span>
              </Button>
          </div>
        </Link>
      </div>

    );
  }
  return (
    <div className="">
      <div className="xl:hidden">
        <Link href={`/login?callBackUrl=${current}`}>
          <Button className="HD_btn w-[80px]">
            <span className="HD_btn_text">로그인</span>
          </Button>
        </Link>
      </div>
      <Link href={`/login?callBackUrl=${current}`}>
        <span className="hidden xl:inline cursor-pointer">로그인</span>
      </Link>
    </div>
  );
};

export default AdminLoginBtn;