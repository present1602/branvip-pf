"use client";

import { SocialLoginButton } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { useEffect, useState } from "react";

/* 네이버(카카오)회원이 동일한 이메일로 카카오(네이버) 가입 시도시 나오는 페이지 */
const DuplicateSocialEmail = () => {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>();
    const [provider, setProvider] = useState<string>();
    const [providerName, setProviderName] = useState<string>();

    const pathname = usePathname();
    // const searchParams = useSearchParams();

    useEffect(() => {


        const emailCheck = searchParams?.get("email") || ''
        const provider = searchParams?.get("provider") || ''

        setProvider(provider)
        setEmail(emailCheck)

        if (provider === 'kakao') {
            setProviderName('카카오')
        } else if (provider === 'naver') {
            setProviderName('네이버')
        }
    }, [searchParams])


    const socialLoginButton = (platform: string) => {
        signIn(platform, {
            callbackUrl: '/',
            redirect: false,
        });
    };

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
            <div className="xl:mt-[113px]">
                <p className="heading3 text-center my-5">{email}</p>
                <p className="heading3 text-center my-5">해당 이메일은 {providerName} 계정으로 가입되어 있습니다.</p>

                <div className="flex items-center mb-[44px] mt-[95px] flex-col gap-[10px] xl:mb-10 xl:mt-[30px]">
                    {provider === 'kakao'
                        &&
                        < SocialLoginButton
                            className="w-[335px]"
                            provider={'kakao'}
                            size="lg"
                            onClick={() => socialLoginButton("kakao")}
                        />
                    }
                    {provider === 'naver'
                        &&
                        < SocialLoginButton
                            className="w-[335px]"
                            provider={'naver'}
                            size="lg"
                            onClick={() => socialLoginButton("naver")}
                        />
                    }
                    <Link href={'/login'}>
                        <p className="heading4 text-center my-5">로그인 페이지로 돌아가기</p>
                    </Link>

                </div>

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
        </div>
    );
};

export default DuplicateSocialEmail;
