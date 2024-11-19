import { IMailData } from "@/pages/api/send-email";

export const sendEmailInquiry = async (emailData: IMailData) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });
  return response.json();
};

export const sendEmailApplication = async (emailData: IMailData) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });
  return response.json();
};
