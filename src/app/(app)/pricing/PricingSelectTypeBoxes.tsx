import React from "react";
import {
  IPricingSelectTypeBox,
  PricingSelectTypeBox,
} from "./PricingSelectTypeBox";
import AllImage from "../../../assets/pricing-all.png";
import DesignImage from "../../../assets/pricing-design.png";
import ApplicationImage from "../../../assets/pricing-application.png";

export function PricingSelectTypeBoxes() {
  const typeBoxes: IPricingSelectTypeBox[] = [
    {
      title: "올인원 솔루션",
      subTitle: "10% 할인",
      description: `로고 디자인과 상표출원을\n한 곳에서 한 번에 지원합니다.`,
      type: "all",
      image: AllImage,
    },
    {
      title: "로고 디자인",
      description: `맞춤형 디자이너 매칭과 특허청 기반 로고 빅데이터를 통해 법적 안정성이 높은 전문적인 로고를 제안합니다.`,
      type: "design",
      image: DesignImage,
    },
    {
      title: "상표출원",
      description: `브랜드를 재산화하고 법적으로 보호받기 위해 특허청에 상표출원을 진행합니다.`,
      type: "application",
      image: ApplicationImage,
    },
  ];
  return (
    <div className="grid gap-4 pc:grid-cols-3 pc:gap-6">
      {typeBoxes.map((typeBox, index) => (
        <PricingSelectTypeBox key={index} {...typeBox} />
      ))}
    </div>
  );
}
