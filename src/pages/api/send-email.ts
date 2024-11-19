import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse} from "next";
import { createMailHtml } from "@/pages/api/send-html/html";

export interface IMailData {
  from?: string | undefined,
  to: string,
  subject: string,
  text?: string,
  cc?: string | undefined,
  bcc?: string | undefined,
  type?: string | undefined,
  name?: string | undefined,
  html?: string
}
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {

  // 구글로 진행
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.MAIL_USER, // Gmail 주소
  //     pass: process.env.MAIL_PASS, // Gmail 앱 비밀번호
  //   },
  // })
  
  const transporter = nodemailer.createTransport({
    service: 'dooray',
    host: 'smtp.dooray.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // Gmail 주소
      pass: process.env.MAIL_PASS, // Gmail 앱 비밀번호
    },
  })

  const { to, subject, text, html , name, type}
    : IMailData
    = req.body;

  const mailHtml = createMailHtml({name,type,subject,text})

  // 메일 데이터 구성
  const mailData : IMailData = {
    from: "contact@branvip.com", // 발신자 주소
    to: req.body.to, // 수신자 주소
    subject: '[브랜빕] 문의가 정상적으로 접수되었습니다', // 메일 제목
    bcc: 'contact@branvip.com',
    html: mailHtml
  };

  try {
    // 메일 전송
    const info = await transporter.sendMail(mailData);
    console.log('Email sent: %s', info.messageId);


    // 응답 보내기
    return res.status(200).json({ status: 'success' });

  } catch (err) {
    console.log('Send mail error:', err);
    return res.status(500).json({ status: 'error' });
  }
}

export default POST;