import { db } from "@/utils/db";
import OpenAI from "openai";
import { Prisma } from "@prisma/client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class OpenaiService {
  async generatePrompt(data: any) {
    // if data is object, convert to string
    if (typeof data === "object") {
      // get only values
      data = Object.values(data);
      data = JSON.stringify(data);
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "extracts keywords based on the user's input object data. if the value is not English, translate to English. output only English keywords.",
        },
        {
          role: "user",
          content: `user'sinput data:\n${data}`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.5,
    });

    return completion.choices[0].message.content;
  }

  async generateLogoImages(letter: string, prompt: string, count: number) {
    console.log("12312321321", prompt, letter, count);
    const size = "256x256";
    const result = await openai.images.generate({
      size,
      n: count,
      prompt: `High-end premium modern logo of the letters '${letter}', featured on 99designs, white background, logo, flaticon, styled on ${prompt}`,
    });

    const urls = result.data.map(({ url }) => url);

    return urls as string[];
  }

  async recommendProductCodes(service: string) {
    const productCodes = await db.productType.findMany({
      orderBy: {
        code: "asc" as Prisma.SortOrder,
      },
    });
    const productTexts = productCodes.map(
      ({ code, title }) => `제${code}류 ${title}`
    );

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "recommend product codes based on the user's input service",
        },
        {
          role: "user",
          content: `아래 상품류 중에서 서비스에 맞는 상품류를 3개 이하로 추천해주세요.\n\n서비스:\n20대 여성 온라인 쇼핑몰\n상품류:\n${productTexts.join(
            "\n"
          )}`,
        },
        {
          role: "assistant",
          content: "추천 상품류: 18, 25, 38",
        },
        {
          role: "user",
          content: `서비스에 맞는 상품류를 3개 이하로 추천해주세요.\n\n서비스:\n카페, 샌드위치 매장`,
        },
        {
          role: "assistant",
          content: "추천 상품류: 29, 30, 43",
        },
        {
          role: "user",
          content: `서비스에 맞는 상품류를 3개 이하로 추천해주세요.\n\n서비스:\n${service}`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.3,
    });
    const result = completion.choices[0].message.content;

    if (!result?.includes("추천 상품류:")) return [];

    const productCodeTexts = result
      .split(": ")[1]
      .split(",")
      .map((code) => code.trim());

    const productCodesByService = productCodes.filter(({ code }) =>
      productCodeTexts.includes(code)
    );

    return productCodesByService.map(
      ({ code, title }) => `제${code}류 ${title}`
    );
  }
}

export const openaiService = new OpenaiService();
