import nodemailer from "nodemailer";
import { db } from "@/utils/db";
import { createAuthCodeHtml } from "@/services/AuthCodehtml";
import { IEnterAuthProps } from "@/actions/AuthCode.action";
import { AuthCode } from ".prisma/client";

class AuthCodeService {
  // 이메일 인증

  // 이메일 인증코드 보내기
  async createAuthCode(email: string) {
    // 이메일 인증 번호 생성

    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return {
        id: 0,
        message:
          "해당 이메일 주소는 이미 사용 중입니다. 다른 이메일을 입력해 주세요.",
      };
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 번호생성
    const expiryTime = new Date(Date.now() - 10 * 60 * 1000); // 만료 시간 설정 (10분)
    try {
      // 만료시간 설정된 컬럼 삭제
      await db.authCode.deleteMany({
        where: {
          email,
          createdAt: {
            lte: expiryTime,
          },
        },
      });

      await db.authCode.create({
        // 인증코드 DB 생성
        data: {
          email,
          code,
        },
      });
      // 이메일 전송 로직 추가
      await sendEmail(email, code);
      return { id: 1, message: "인증번호가 메일로 전송되었습니다." };
    } catch (e) {
      console.log(e);
      throw new Error("이메일 인증 코드를 보내지 못했습니다.");
    }
  }

  // 인증코드 검증
  // DB 인증 코드를 불러온 뒤 5분의 만료시간이 지나지않으면
  // 메시지와 boolean 을 return
  async verifyAuthCode({ enterCode, email }: IEnterAuthProps) {
    const dbAuthResult = (await db.authCode.findFirst({
      where: {
        AND: [
          {
            email: email,
          },
          {
            code: enterCode,
          },
        ],
      },
    })) as AuthCode;

    if (dbAuthResult) {
      const currentTime = new Date();
      const codeTime = new Date(dbAuthResult.createdAt);
      const timeDiff = (currentTime.getTime() - codeTime.getTime()) / 1000;
      console.log(currentTime, codeTime, timeDiff);
      // 5분간 유효
      if (timeDiff < 300) {
        return { auth: true, message: "" };
      } else {
        return { auth: false, message: "인증 코드가 만료되었습니다." };
      }
    }
    if (!dbAuthResult) {
      return { auth: false, message: "인증 코드가 올바르지 않습니다." };
    }
    return dbAuthResult;
  }
}

async function sendEmail(email: string, code: string) {
  const mailTransporter = nodemailer.createTransport({
    service: "dooray",
    host: "smtp.dooray.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // Gmail 주소
      pass: process.env.MAIL_PASS, // Gmail 앱 비밀번호
    },
  });

  const mailHtml = createAuthCodeHtml({ code, email });
  const mailData = {
    from: "contact@branvip.com", // 발신자 주소
    to: email, // 수신자 주소
    subject: "[브랜빕] 이메일 인증 코드", // 메일 제목
    html: mailHtml,
  };

  try {
    const mailInfo = await mailTransporter.sendMail(mailData);
    console.log("Email sent: %s", mailInfo.messageId);
  } catch (e) {
    console.log("인증 메일을 보내는데 실패했습니다", e);
  }
}

export const authCodeService = new AuthCodeService();
