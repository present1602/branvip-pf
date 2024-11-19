"use client";

import OR from "@/components/v3/components/OR";
import Button from "@/components/v3/components/BUI/Button/Button";
import { SocialLoginButton } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";


/* 이메일 가입한 회원이 소셜로그인으로 가입 시도 시 기존 이메일이 있다고 알려주는페이지
    (기존 이메일 회원이 소셜계정과 나중에 연동하는 기능 개발 시 이 페이지는 필요 없음) 
 */

const EmailAccountExist = () => {
    const searchParams = useSearchParams();
    const session = useSession();
    const [email, setEmail] = useState<string>();
    const [provider, setProvider] = useState<string>();
    const [providerName, setProviderName] = useState<string>();

    const router = useRouter();

    const pathname = usePathname();
    // const searchParams = useSearchParams();

    useEffect(() => {
        const paramEmail = searchParams?.get("email")
        const paramProvider = searchParams?.get("provider")

        paramEmail && setEmail(paramEmail)
        if (paramProvider === 'kakao') {
            setProvider(paramProvider)
            setProviderName('카카오')
        } else if (paramProvider === 'naver') {
            setProvider(paramProvider)
            setProviderName('네이버')
        }

    }, [searchParams])




    return (
        <div className="xl:mbj-[246px] mb-[210px] mt-20 flex flex-col items-center xl:mt-[100px]">

            <div className="hidden xl:inline">
                <Image
                    src="/renewal/assets/svg/logo/branvip-logo.svg"
                    alt="logo"
                    width={136}
                    height={38}
                />
            </div>

            {/* <div className="xl:mt-[113px]">
                <p className="heading3 text-center my-5">{email}</p>
                <p className="heading3 text-center my-5">해당 이메일은 가입되어 있습니다.</p>
                <p className="heading3 text-center my-5">이메일아이디를 {providerName} 계정과 연동하시겠습니까?</p>
            </div>
            
            <div className="mt-10">
                <Button size="L" width={335}>
                    <span className="body1-bold text-warm_gray_scale-50">
                        {providerName} 계정과 연동하기
                    </span>
                </Button>
            </div>

            <Link href={'/login'}>
                <p className="heading4 text-center my-6">로그인 페이지로 돌아가기</p>
            </Link> */}

            <div className="xl:mt-[113px]">
                <p className="heading3 text-center my-5">{email}</p>
                <p className="heading3 text-center my-5">해당 이메일은 이미 가입되어 있습니다.</p>
                <p className="heading3 text-center my-5">이메일 로그인을 이용해주세요.</p>
            </div>


            <Link href={'/login?callBackUrl=/'}>
                <p className="heading4 text-center my-6">로그인 페이지로 돌아가기</p>
            </Link>

            {/* <div className="mt-10">
                <Link href={`/`}>
                    <Button size="L" width={335}>
                        <span className="body1-bold text-warm_gray_scale-50">
                            카카오아이디와 연결하기
                        </span>
                    </Button>
                </Link>
            </div> */}
        </div>
    );
};

export default EmailAccountExist;
