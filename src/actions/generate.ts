"use server";

import { openaiService } from "@/services/openai.service";

export const generateLogoImages = async (
  brandName: string,
  data: any,
  count: number
) => {
  const prompt = await openaiService.generatePrompt(data);
  const result = await openaiService.generateLogoImages(
    brandName,
    prompt ?? "",
    count
  );
  return result;
};

export const recommendProductCodes = async (service: string) => {
  const result = await openaiService.recommendProductCodes(service);
  return result;
};
