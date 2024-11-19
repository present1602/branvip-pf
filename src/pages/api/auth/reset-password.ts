import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/db";
import { v4 } from "uuid";
import nodemailer from "nodemailer";
import { creatResetPWHtml } from "@/pages/api/auth/createResetPWHtml";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 비밀번호 변경 전 이메일 검증
  if (req.method === "POST") {
    const { email } = req.body;

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "가입되어 있지않은 이메일입니다." });
    }

    if (!user.password) {
      return res
        .status(404)
        .json({ message: "소셜로그인 계정입니다. 소셜로그인을 시도해주세요." });
    }

    const token = v4();

    await db.passwordResetToken.create({
      data: {
        token,
        userEmail: email,
        expiresAt: new Date(Date.now() + 3600 * 1000),
      },
    });

    const resultUrl = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "dooray",
      host: "smtp.dooray.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER, // Gmail 주소
        pass: process.env.MAIL_PASS, // Gmail 앱 비밀번호
      },
    });

    const mailHtml = creatResetPWHtml({ email, resultUrl });

    const mailData = {
      from: "contact@branvip.com", // 발신자 주소
      to: email, // 수신자 주소
      subject: "[브랜빕] 비밀번호 재설정", // 메일 제목
      html: mailHtml,
    };

    try {
      await transporter.sendMail(mailData);
      return res
        .status(200)
        .json({ message: "비밀번호 초기화를 위한 메일이 전송되었습니다." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "메일을 보내는데 실패하였습니다." });
    }

    // 비밀번호 변경
  } else if (req.method === "PUT") {
    const { token, password } = req.body;

    const resetToken = await db.passwordResetToken.findUnique({
      where: {
        token: token,
      },
      include: { users: true },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return res
        .status(400)
        .json({ message: "잘못된 토큰입니다 다시 요청해주세요." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: {
        email: resetToken.userEmail,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: {
        token,
      },
    });

    return res.status(200).json({ message: "비밀번호가 변경되었습니다." });
  } else {
    return res.status(200).json({ message: "허용되지 않은 메소드입니다." });
  }
}
