"use client";


import Button from "@/components/v3/components/BUI/Button/Button";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { updateUserLoginTypeByEmail } from "@/actions/user.action";
// import { updateLoginType } from "@/actions/updateLoginType.action";
// import { toast } from "@/components/ui/use-toast";

/* 
################
기존 이메일 회원이 소셜회원으로 변경하는 페이지 
현재는 사용안하고 있으나 나중에 적용시킬 수있음
###############
*/
const LoginTypeChangePage = () => {
    const searchParams = useSearchParams();

    const [email, setEmail] = useState<string>('');
    const [provider, setProvider] = useState<string>();
    const [providerName, setProviderName] = useState<string>();

    const [accessToken, setAccessToken] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    const router = useRouter();

    const pathname = usePathname();
    // const searchParams = useSearchParams();

    const connectSocialAccountClick = () => {

        async function handleUpdateLoginType() {
            if (provider === 'naver' || provider === 'kakao') {
                try {
                    const resultUser = await updateUserLoginTypeByEmail(userId, email, provider, accessToken)

                    if (resultUser && resultUser.loginType === provider) {
                        await signIn(provider, { callbackUrl: '/', redirect: false })

                    } else {
                        toast({
                            title: '소셜로그인 연동에 실패했습니다.',
                            variant: 'success',
                        })
                    }
                } catch (err: any) {
                    console.log("err : ", err)
                    toast({
                        title: '소셜로그인 연동에 실패했습니다.',
                        variant: 'success',
                    })
                }

            }
        }
        if (provider === 'kakao' || provider === 'naver') {
            handleUpdateLoginType()
        }

    }

    useEffect(() => {
        const paramEmail = searchParams?.get("email")
        const paramProvider = searchParams?.get("provider")
        const paramId = searchParams?.get("id")
        const paramProviderAccountId = searchParams?.get("providerAccountId")
        const paramAccessToken = searchParams?.get("accessToken")

        paramId && setUserId(paramId)
        paramEmail && setEmail(paramEmail)

        paramAccessToken && setAccessToken(paramAccessToken)

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

            <div className="xl:mt-[113px]">
                <p className="heading3 text-center my-5">{email}</p>
                <p className="heading3 text-center my-5">해당 이메일은 가입되어 있습니다.</p>
                <p className="heading3 text-center my-5">이메일아이디를 {providerName} 계정과 연동하시겠습니까?</p>
            </div>

            <div className="mt-10">
                <Button size="L" width={335} onClick={() => connectSocialAccountClick()}>
                    <span className="body1-bold text-warm_gray_scale-50">
                        {providerName} 계정과 연동하기
                    </span>
                </Button>
            </div>

            <Link href={'/login'}>
                <p className="heading4 text-center my-6">로그인 페이지로 돌아가기</p>
            </Link>

        </div>
    );
};


export default LoginTypeChangePage;
