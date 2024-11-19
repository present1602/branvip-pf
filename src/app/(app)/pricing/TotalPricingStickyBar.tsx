"use client";

import { usePricingStore } from "@/hooks/pricing.store";
import React from "react";

export function TotalPricingStickyBar() {
  const { selectedPricings, totalPrice, packageType } = usePricingStore();
  const discounted = packageType === "all";

  if (
    !packageType ||
    !selectedPricings.length ||
    (discounted && selectedPricings.length < 2)
  )
    return null;

  const discountPrice = totalPrice * 0.1;
  const totalPriceResult =
    (discounted ? totalPrice - discountPrice : totalPrice) * 1.1;

  return (
    <div className="bottom-0 left-0 right-0 w-full border-t border-surface-200 bg-white">
      <div className="container grid gap-2 py-4">
        <ul className="grid gap-2">
          {selectedPricings.map((pricing, index) => (
            <li key={index}>
              <div className="flex justify-between font-medium">
                <div className="text-surface-400">{pricing.title}</div>
                <div className="text-surface-600">
                  {pricing.price.toLocaleString()}원
                </div>
              </div>
            </li>
          ))}
          {discounted && (
            <li>
              <div className="flex justify-between font-medium">
                <div className="text-surface-400">10% 할인</div>
                <div className="text-surface-600">
                  -{discountPrice.toLocaleString()}원
                </div>
              </div>
            </li>
          )}
        </ul>

        <div className="flex justify-between">
          <div className="text-xl text-surface-700">
            <strong className="font-bold">예상 비용</strong>
            <small className="ml-1 text-sm">(부가세 포함)</small>
          </div>

          <strong className="text-xl font-black text-primary-500">
            {totalPriceResult.toLocaleString()}원
          </strong>
        </div>
      </div>
    </div>
  );
}
