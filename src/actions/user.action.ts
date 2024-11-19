"use server"

import { userService } from "@/services/user.service";
import { getServerUserOrRedirect } from "./authAction";
import { IUserUpdate } from "@/app/(app)/(user)/my/info/user/UserInfo";
import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";
import { formatDateTimeString } from "@/utils/formatters";

export async function dropUser() {
    const { id } = await getServerUserOrRedirect();
    const userData = await userService.getUserProfile(id);

    const deleteDateString = formatDateTimeString(new Date())
    const deletedEmail = `D${deleteDateString}:${userData.email}`

    /* 적용안함 테스트안함 완성안됨 */
    try {
        await db.$transaction(async (tx) => {
            const deletedUser = await tx.user.update({
                where: { id },
                data: {
                    isDeleted: true,
                    email: deletedEmail
                }
            });

            await tx.droppedUserLog.create({
                data: {
                    userId: deletedUser.id,
                    name: deletedUser.name,
                    email: deletedUser.email
                }
            })

            if (deletedUser && (userData.loginType === 'kakao' || userData.loginType === 'naver')) {
                await tx.account.deleteMany({
                    where: { userId: id }
                });
            }
        });

    } catch (err) {
        // 로그 기록 및 사용자에게 오류 메시지 전달
        console.error('Error in dropUser:', err);
        throw err; // 오류를 호출한 쪽으로 전파
    }
}

export async function getUserProfile() {
    const { id } = await getServerUserOrRedirect();
    return await userService.getUserProfile(id)
}

export async function updateUser(data: IUserUpdate) {
    const { id } = await getServerUserOrRedirect();
    return await userService.updateUser(data, id)
}

export async function getUserByEmail(email: string) {
    return await userService.getUserByEmail(email)
}


// async function fetchKakaoProfile(accessToken: string) {
//     try {
//         const response = await fetch('https://kapi.kakao.com/v2/user/me', {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch Kakao profile');
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching Kakao profile:', error);
//         return null;
//     }
// }
export async function updateUserLoginTypeByEmail(userId: string, email: string, provider: string, accessToken: string) {
    // if(provider === 'kakao'){
    //     console.log()
    //     const kakaoProfile = await fetchKakaoProfile(accessToken);
    //     console.log("kakaoProfile : ", kakaoProfile)

    //     if(kakaoProfile){
    //         // 로그인타입 kakao or naver이나 accounts 테이블에 저장안된 회원(이메일 회원이 카카오나 네이버 소셜회원 전환하기 누른 경우 실행)
    //         const accountData: Prisma.AccountCreateInput = {
    //             user: { connect: { id: userId } }, // 사용자와 연결
    //             provider: provider,
    //             providerAccountId: kakaoProfile.id,
    //             socialEmail: kakaoProfile.kakao_account.email,
    //             access_token: kakaoProfile.access_token,
    //             refresh_token: kakaoProfile.refresh_token,
    //             expires_at: kakaoProfile.expires_at,
    //             scope: kakaoProfile.scope,
    //             type: 'oauth'
    //         }

    //         await userService.createAccount(accountData);
    //         return await userService.updateUserLoginTypeByEmail(provider, email)
    //     }
    // }else if(provider === 'naver'){
    //     // console.log()
    //     // const kakaoProfile = await fetchKakaoProfile(accessToken);
    //     // console.log("kakaoProfile : ", kakaoProfile)

    //     return await userService.updateUserLoginTypeByEmail(provider, email)
    // }
    return await userService.updateUserLoginTypeByEmail(provider, email)


}
