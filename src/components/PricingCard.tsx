"use client";

import { Pricing } from "@prisma/client";
import React from "react";
import { Icon } from "./ui";
import { cn } from "../lib/utils";
import { PricingCheckbox } from "./PricingCheckbox";
import { usePricingStore } from "../hooks/pricing.store";

interface IPricingCardProps {
  pricing: Pricing;
}

function PricingCardTitle({ title = "", description = "" }) {
  return (
    <>
      <p className="font-bold">{title}</p>
      {description && (
        <p className="text-sm font-medium text-gray-500">
          예상 기간 : {description}
        </p>
      )}
    </>
  );
}

function Divider() {
  return <div className="h-px w-full bg-surface-100" />;
}

function CheckListItem({ label = "", primary = false }) {
  return (
    <li
      className={cn(
        "flex items-center gap-1 text-slate-600",
        primary && "text-primary-500"
      )}
    >
      <Icon name="CheckIcon" size="sm" />
      <p className={cn("text-sm font-medium ")}>{label}</p>
    </li>
  );
}

export function PricingCard({ pricing }: IPricingCardProps) {
  const { selectedPricings, setSelectedPricings } = usePricingStore();
  const checked = selectedPricings.includes(pricing);
  const discounted = !!pricing.regularPrice;

  const onChange = (checked: boolean) => {
    const type = pricing.type;

    if (checked) {
      // remove other pricing with same type
      setSelectedPricings(
        selectedPricings.filter((p) => p.type !== type).concat(pricing)
      );
    } else {
      setSelectedPricings(selectedPricings.filter((p) => p.id !== pricing.id));
    }
  };

  return (
    <PricingCheckbox
      title={
        <PricingCardTitle
          title={pricing.title}
          description={pricing.periodText ?? ""}
        />
      }
      checked={checked}
      onChange={onChange}
    >
      <div className="flex flex-col items-start justify-start gap-4">
        <div className="w-full pt-1">
          <p
            className={cn(
              "text-sm font-medium text-surface-300 line-through",
              !discounted && "text-transparent"
            )}
          >
            {pricing.regularPrice
              ? pricing.regularPrice.toLocaleString() + "원"
              : "-"}
          </p>
          <div className="grid gap-1">
            <strong className="text-xl font-black">
              {pricing.price.toLocaleString()}원
            </strong>
            <p className="text-sm text-surface-700">(부가세 별도)</p>
          </div>
        </div>
        <Divider />
        <ul className="grid gap-2">
          {pricing.features.map((feature, index) => (
            <CheckListItem key={index} label={feature} />
          ))}
          {pricing.primaryFeatures.map((feature, index) => (
            <CheckListItem key={index} label={feature} primary />
          ))}
        </ul>
        <div className="py-2">
          <p className="text-sm text-gray-500">{pricing.description}</p>
        </div>
      </div>
    </PricingCheckbox>
  );
}
