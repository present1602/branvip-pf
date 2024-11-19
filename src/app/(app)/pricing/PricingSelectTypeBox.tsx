"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { PricingCheckbox } from "../../../components/PricingCheckbox";
import { TPackageType, usePricingStore } from "../../../hooks/pricing.store";

export interface IPricingSelectTypeBox {
  title: string;
  subTitle?: string;
  description: string;
  image: StaticImageData;
  type: TPackageType;
}

export function PricingSelectTypeBox({
  title,
  subTitle,
  description,
  image,
  type,
}: IPricingSelectTypeBox) {
  const { packageType, setPackageType, reset } = usePricingStore();

  const onChecked = (checked: boolean) => {
    if (checked) {
      reset();
      setPackageType(type);

      scrollBy({
        top: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <PricingCheckbox
      title={
        <>
          <Image src={image} alt={title} width={48} height={48} />
        </>
      }
      checked={packageType === type}
      onChange={onChecked}
    >
      <div className="grid gap-2 pt-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{title}</span>
          {subTitle && (
            <span className="text-sm font-bold text-primary-500">
              {subTitle}
            </span>
          )}
        </div>

        <p className="whitespace-pre-line text-start font-medium text-surface-500">
          {description}
        </p>
      </div>
    </PricingCheckbox>
  );
}
