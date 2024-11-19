"use client";

import OR from "@/components/v3/components/OR";
import Button from "@/components/v3/components/BUI/Button/Button";
import { SocialLoginButton } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUserStore } from "@/hooks/user.store";


const LoginComponent = () => {
  const searchParams = useSearchParams();
  const callBackUrl =
    searchParams != null
      ? searchParams.get("callBackUrl")
      : "/defaultRedirectPath";
  const session = useSession();
  const router = useRouter();
  const { setUser: setPersistUser } = useUserStore()

  if (session.status == "authenticated") {
    router.back();
  }

  const socialLoginButton = async (platform: string) => {
    try {
      await signIn(platform, { callbackUrl: callBackUrl ? callBackUrl : '/' });
    } catch (e) {
      router.push("/");
    } finally {
      router.push("/");
    }
  };

  useEffect(() => {
    if (session.data?.user) {
      const sessioUser = session.data?.user
      const userState = {
        id: sessioUser.id,
        email: sessioUser.email || '',
        name: sessioUser.name,
      };
      setPersistUser(userState)

      router.push('/'); // 로그인 후 리디렉션할 페이지
    }
  }, [session, setPersistUser, router]);

  return (
    <div className="xl:mbj-[246px] mb-[210px] mt-20 flex flex-col items-center xl:mt-[100px]">
      {/*Only Pc logo*/}
      <div className="hidden xl:inline">
        <Image
          src="/renewal/assets/svg/logo/branvip-logo.svg"
          alt="logo"
          width={136}
          height={38}
        />
      </div>
      <div className="xl:mt-[113px]">
        <span className="heading2 xl:title1">로그인</span>
      </div>
      {/*kakao never login btn*/}

      <div className="mb-[44px] mt-[95px] flex flex-col gap-[10px] xl:mb-10 xl:mt-[30px]">
        <SocialLoginButton
          className="w-[335px]"
          provider="kakao"
          size="lg"
          onClick={() => socialLoginButton("kakao")}
        />
        <SocialLoginButton
          className="w-[335px]"
          provider="naver"
          size="lg"
          onClick={() => socialLoginButton("naver")}
        />
      </div>



      {/*또는*/}
      <OR />
      {/*email btn*/}
      <div className="mt-10">
        <Link href={`/login/email?callBackUrl=${callBackUrl}`}>
          <Button size="L" width={335}>
            <span className="body1-bold text-warm_gray_scale-50">
              이메일로 계속하기
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginComponent;
