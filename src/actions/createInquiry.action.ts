"use server";

import { inquiryService } from "@/services/inquiry.service";

interface ICreateInquiryDto {
  type: string;
  title: string;
  name: string;
  email: string;
  content: string;
}

export const createInquiry = async ({
  type,
  title,
  name,
  email,
  content,
}: ICreateInquiryDto) => {
  const isMailing = false;

  // 메일 보내야하는곳

  return await inquiryService.createInquiry({
    type,
    title,
    name,
    email,
    content,
    isMailing,
  });
};
