"use client";

import { useContactStore } from "@/hooks/contact.store";
import { usePricingStore } from "@/hooks/pricing.store";
import React from "react";

const buildTexts = (first?: string | null, second?: string | null) => {
  if (!first && !second) return "";
  if (second && !first) return second;
  if (first && !second) return first;
  return `${first}, ${second}`;
};

export function DesktopSummary() {
  const { order } = useContactStore();
  const {
    selectedPricings,
    finalPaymentPrice,
    tenPercentDiscountAmount,
    totalPatentOfficeFee,
    applicationMultiplier,
    totalVAT,
  } = usePricingStore();

  const moods = order?.selectedMoods
    ? (order.selectedMoods as string[]).join(", ")
    : "";
  const aiCount = (order?.referenceAiImageUrls as string[])?.length || 0;

  const logoText = !!order?.isLogoIncluded ? "도형상표" : "";
  const wordmarkText = !!order?.isWordmarkIncluded ? "문자상표" : "";
  const trademarkTypes = buildTexts(logoText, wordmarkText);
  const trademarkNames = buildTexts(
    order?.trademarkNameKr,
    order?.trademarkNameEn,
  );
  const productCount = (order?.productTypeCodes as string[])?.length || 0;

  const hasData =
    !!moods ||
    !!aiCount ||
    !!trademarkTypes ||
    !!trademarkNames ||
    !!productCount;

  if (!hasData) return null;

  return (
    <div className="divide-y divide-surface-100 rounded-md border border-surface-100 bg-surface-50 px-6 py-2">
      <ListItem title="분위기" value={moods} />
      <ListItem title="AI 시안" value={aiCount} />
      <ListItem title="상표 유형" value={trademarkTypes} />
      <ListItem title="상표명" value={trademarkNames} />
      <ListItem title="상품 분류" value={productCount}>
        <div className="grid max-h-[96px] gap-2 overflow-y-auto rounded-md bg-surface-100 p-2">
          {(order?.productTypeCodes as string[])?.map((code) => (
            <ProductCodeLabel key={code} title={code} />
          ))}
        </div>
      </ListItem>
      {!!finalPaymentPrice && (
        <>
          {selectedPricings.map((p) => {
            const priceText = p.price.toLocaleString() + "원";
            const isApplication = p.type !== "DESIGN";
            const addUnit = isApplication
              ? ` x ${applicationMultiplier}개`
              : "";

            return (
              <ListItem
                key={p.id}
                title={p.title}
                value={priceText + addUnit}
              />
            );
          })}

          {!!tenPercentDiscountAmount && (
            <ListItem
              title="10% 할인"
              value={tenPercentDiscountAmount.toLocaleString() + "원"}
            />
          )}

          {!!totalVAT && (
            <ListItem
            title="부가세"
            value={totalVAT.toLocaleString() + "원"}
          />
          )}

          {!!totalPatentOfficeFee && (
            <ListItem
              title="특허청 수수료"
              value={
                totalPatentOfficeFee.toLocaleString() +
                "원 x " +
                applicationMultiplier +
                "개"
              }
            />
          )}
          <div className="flex justify-between py-4">
            <div className="flex items-end font-bold text-surface-700">
              <span className="text-lg">결제금액</span>
              <span className="mb-1 text-xs font-normal text-surface-500">
                (VAT포함)
              </span>
            </div>
            <div className="text-xl font-black text-primary-400">
              {finalPaymentPrice.toLocaleString()}원
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface IProps {
  title: string;
  value?: string | number;
  children?: React.ReactNode;
}
const ListItem: React.FC<IProps> = ({ title, value, children }) => {
  if (!value) return null;

  return (
    <div className="grid gap-4 py-4">
      <div className="flex justify-between gap-4 font-medium">
        <span className="w-[100px] truncate  text-surface-400">{title}</span>
        <span className="flex-1 text-right text-surface-600">{value}</span>
      </div>
      {children}
    </div>
  );
};

interface IProdctCodeLabelProps {
  title: string;
}
const ProductCodeLabel: React.FC<IProdctCodeLabelProps> = ({ title }) => {
  const [code, ...name] = title.split(" ");

  return (
    <div className="flex w-fit gap-1 rounded-md bg-surface-50 px-2 py-1 text-sm font-medium">
      <span className="text-surface-400">{code}</span>
      <span className="text-surface-600">{name.join(" ")}</span>
    </div>
  );
};
