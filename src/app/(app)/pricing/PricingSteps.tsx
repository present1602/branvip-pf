"use client";

import React from "react";
import { PricingStepLayout } from "./PricingStepLayout";
import { PricingSelectTypeBoxes } from "./PricingSelectTypeBoxes";
import { Pricing } from "@prisma/client";
import { PricingCard } from "../../../components/PricingCard";
import { usePricingStore } from "../../../hooks/pricing.store";
import { cn } from "../../../lib/utils";

interface IProps {
  applicationPricings: Pricing[];
  designPricings: Pricing[];
  applicationWithDesignPricings: Pricing[];
}

export function PricingSteps({
  applicationPricings,
  designPricings,
  applicationWithDesignPricings,
}: IProps) {
  const { packageType } = usePricingStore();
  const isAll = packageType === "all";

  // all in one 서비스는 예외처리
  const appPricings = isAll
    ? applicationWithDesignPricings
    : applicationPricings;

  return (
    <div className="grid gap-8">
      <PricingStepLayout
        step={1}
        title="서비스를 선택해주세요"
        description={`로고 디자인과 상표출원을 한 번에 진행하거나\n 필요에 맞게 따로 선택할 수 있어요.`}
      >
        <PricingSelectTypeBoxes />
      </PricingStepLayout>
      {packageType && (
        <>
          {packageType !== "application" && (
            <PricingStepLayout
              htmlId="step-2"
              step={2}
              title="로고 디자인을 선택해 주세요"
            >
              <div className="grid gap-4 pc:grid-cols-4 pc:gap-6">
                {designPricings.map((pricing, index) => (
                  <PricingCard key={index} pricing={pricing} />
                ))}
              </div>
            </PricingStepLayout>
          )}

          {packageType !== "design" && (
            <PricingStepLayout
              step={packageType === "application" ? 2 : 3}
              title="상표 서비스를 선택해 주세요"
            >
              <div
                className={cn(
                  "grid gap-4 pc:grid-cols-4 pc:gap-6",
                  isAll && "pc:grid-cols-3"
                )}
              >
                {appPricings.map((pricing, index) => (
                  <PricingCard key={index} pricing={pricing} />
                ))}
              </div>
              <p className="text-sm text-surface-700">
                특허청에 납부하는 특허청 수수료(출원관련수수료, 등록수수료 등)는
                출원인 실비 부담으로 서비스 비용과 별도입니다.
              </p>
            </PricingStepLayout>
          )}
        </>
      )}
    </div>
  );
}
