import { pricingService } from "@/services/pricing.service";
import React from "react";
import PricingTitle from "./PricingTitle";
import { PricingSteps } from "./PricingSteps";
import { TotalPricingStickyBar } from "./TotalPricingStickyBar";

export const revalidate = 0;

export default async function PricingPage() {
  const pricing = await pricingService.getAllPricing();

  return (
    <>
      <div className="container pb-20 pt-10 max-pc:pt-8 pc:pb-32">
        <PricingTitle />
        <PricingSteps {...pricing} />
      </div>
      <TotalPricingStickyBar />
    </>
  );
}
