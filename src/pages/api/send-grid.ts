// import sgMail from "@sendgrid/mail";
// import { NextApiRequest, NextApiResponse } from "next";
// import { IMailData } from "@/pages/api/send-email";
// import { createMailHtml } from "@/pages/api/send-html/html";
//
// sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
//
// type Data = {
//   message: string;
// }
//
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//
//   if (req.method === "POST") {
//     const { to, subject, text, html , name, type}
//       : IMailData
//       = req.body;
//
//     const mailHtml = createMailHtml({name,type,subject,text})
//     const msg = {
//       to: to,
//       from: "contact@branvip.com",
//       bcc:'contact@branvip.com',
//       subject: '성공적으로 문의가 진행되었습니다',
//       text: "test",
//       html: mailHtml,
//     };
//
//     try {
//       await sgMail.send(msg);
//       res.status(200).json({ message: "Email sent successfully" });
//     } catch (err) {
//       console.error(err);
//
//       res.status(500).json({ message: "Email not sent" });
//     }
//
//
//   }else{
//     res.setHeader('Allow', ['POST']);
//     res.status(405).json({message: 'Method Not Allowed' })
//   }
//
//
// }