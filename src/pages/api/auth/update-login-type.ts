
import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT") {
        const { userId, loginType } = req.body

        // 로직 : user.id 와 email 받아와서
        // user table login_type : email -> kakao(naver)로 업데이트
        // account table accout 

        // const { email } = req.body;
        console.log("api userId : ", userId)
        console.log("api loginType : ", loginType)

        const user = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                loginType: loginType
            }
        });
        console.log("after user : ", user)
        return user
    }
}