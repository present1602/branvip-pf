"use client";

import React, {FC, useEffect, useState} from "react";
import {getServerUser} from "@/actions/authAction";
import {useSession} from "next-auth/react";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {MobileRightDrawer} from "@/components/v3/components/MobileRightDrawer";
import Image from "next/image";
import {useUserStore} from "@/hooks/user.store";

const LoginBtn: FC = () => {
  const [user, setUser] = useState<{ id: string; phoneNumber: string } | any>(
    undefined
  );
  const { user: persistUser } = useUserStore()

  const [current, setCurrent] = useState("");
  const session = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // const { setMessage } = useEmailStore();

  useEffect(() => {
    setUser({ image: "", name: "로딩중" });
    async function fetchUser() {
      const users = await getServerUser();
      setUser(users);
    }
    fetchUser();
  }, [session]);

  // 로그인시 callBackUrl 무결성을 위한 함수
  useEffect(() => {
    if (pathname === "/login") {
      setCurrent(searchParams?.get("callBackUrl") ?? "/");

      // const emailMessage = searchParams?.get("message");

      // if (emailMessage === 'kakao_exist') {
      //   setMessage('동일한 이메일로 가입된 카카오계정이 있습니다.')
      // } else if (emailMessage === 'naver_exist') {
      //   setMessage('동일한 이메일로 가입된 네이버계정이 있습니다.')
      // }

    } else if (pathname) {
      setCurrent(pathname);
    } else {
      setCurrent("/");
    }
  }, [pathname, searchParams]);


  // useEffectOnce(() => {
  //   if (pathname === "/login") {
  //     console.log("use email : ", searchParams?.get("email"))
  //     const emailCheck = searchParams?.get("email");
  //     const emailMessage = searchParams?.get("message");

  //     setEmail(emailCheck!)

  //     if (emailMessage === 'kakao_exist') {
  //       setMessage('동일한 이메일로 가입된 카카오계정이 있습니다.')
  //     } else if (emailMessage === 'kakao_exist') {
  //       setMessage('동일한 이메일로 가입된 네이버계정이 있습니다.')

  //     }
  //   }
  // })

  const handleClick = () => {
    router.push("/my/info/user");
  };

  React.useEffect(() => {
    setUser(persistUser)
  }, [persistUser])

  if (session.status === "authenticated") {
    return (
      <div>
        <div className="xl:hidden">
          <MobileRightDrawer />
        </div>
        <button onClick={handleClick} className="hidden h-1 xl:inline">
          <div className="flex items-center justify-center">
            <div className="text1-medium mr-1">{user?.name + "님" ? user?.name : user?.name + "님"}</div>
            <div className="">
              <Image
                src={user?.image || "/renewal/assets/images/ill/mood4.png"}
                alt={"image"}
                width={30}
                height={30}
                sizes={"30px"}
                className={"rounded-full border-2"}
              />
            </div>
          </div>
        </button>
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
        <span className="hidden cursor-pointer xl:inline">로그인</span>
      </Link>
    </div>
  );
};

export default LoginBtn;
