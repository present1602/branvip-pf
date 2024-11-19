"use server";

import { openaiService2 } from "@/services/openai.service2";
import axios from "axios";
import { Prisma } from "@prisma/client";

interface IDataProps {
  isLogoIncluded: boolean;
  trademarkNameKr?: string;
  trademarkNameEn?: string;
  serviceIntroduction?: string;
  productTypeCodes: string[];
  logoType: string;
  recommendLogoImagePath?: string[];
  selectedMoods?: string[];
  brandMeaning?: string[];
  brandName?: string[];
}

export const generateLogoImages = async (
  brandName: string | undefined,
  data: Partial<Prisma.OrderCreateInput> | undefined,
  colors: string[]
) => {
  let newObject = {};
  if (data) {
    const logotype = data.logoType?.trim();
    let typeDescription;
    if (logotype === "심볼") {
      typeDescription = `텍스트나 캐릭터가 들어가지 않게 오직 심볼만을 이용하여 만들어주세요 `;
    } else if (logotype === "텍스트") {
      typeDescription = `심볼이나 캐릭터가 들어가지 않게 오직 텍스트만을 이용하여 만들어주세요 `;
    } else if (logotype === "캐릭터") {
      typeDescription = `심볼이나 텍스트가 들어가지 않게 오직 캐릭터 이미지만을 이용하여 만들어주세요`;
    } else {
      typeDescription = `심복이나 캐릭터를 이용하고 추가로 텍스트도 넣어서 로고 이미지를 만들어주세요`;
    }

    const colorObject = `${[...colors]} 이 색상을 이용해서 만들어줘`;
    newObject = {
      colors: colorObject,
      trademarkNameKr: data.trademarkNameKr,
      trademarkNameEn: data.trademarkNameEn,
      serviceIntroduction: data.serviceIntroduction,
      logoType: typeDescription,
      productTypeCodes: data.productTypeCodes,
      selectedMoods: data.selectedMoods,
    };
  }
  const prompt = await openaiService2.generatePrompt(newObject);
  let results: string[] = [];
  for (let i = 0; i < 3; i++) {
    if (brandName != null) {
      const result = await openaiService2.generateLogoImages(
        brandName,
        prompt ?? ""
      );
      if (result) {
        results.push(result.url || '');
      }
    }
  }
  return results;
};
