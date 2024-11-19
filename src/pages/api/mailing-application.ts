import nodemailer from "nodemailer";
import {createMailHtmlApplication,} from "@/pages/api/mailing-application/html";
import {createMailHtmlApplication2} from "@/pages/api/mailing-application2/html";

export const mailingApplication = async (
  name: string | null,
  email: string | null,
  productType: any,
  trademarkNameKr: string | null | undefined,
  trademarkNameEn: string | null | undefined,
  serviceIntroduction: string | null | undefined,
  items: any,
  type: string
) => {
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

  let mailHtml;
  if (type == "DESIGN") {
  } else {
    if (typeof items === "string") {
      mailHtml = createMailHtmlApplication(
          name,
          productType,
          trademarkNameKr,
          trademarkNameEn,
          serviceIntroduction,
          items
      );
    } else {
      mailHtml = createMailHtmlApplication2(
          name,
          productType,
          trademarkNameKr,
          trademarkNameEn,
          serviceIntroduction,
          items
      );
    }

  }

  const mailData = {
    from: "contact@branvip.com", // 발신자 주소
    to: email ? email : "", // 수신자 주소
    subject: "[브랜빕] 의뢰가 정상적으로 접수되었습니다", // 메일 제목
    cc: "contact@branvip.com",
    html: mailHtml,
  };

  try {
    const info = await transporter.sendMail(mailData);
  } catch (e) {
    console.error(e);
  }
};
