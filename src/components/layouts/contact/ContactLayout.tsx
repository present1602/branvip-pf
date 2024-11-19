"use client";

import React, { useEffect, useState } from "react";
import { useContactStore } from "@/hooks/contact.store";
import { DesktopSummary } from "./DesktopSummary";
import { Progress } from "@nextui-org/react";
import { useProgressStore } from "@/hooks/progress.store";
import { round } from "@floating-ui/utils";

interface IProps {
  children: React.ReactNode;
  subTitle: string;
  description: string;

  action?: React.ReactNode;
}

export function ContactLayout({
                                children,
                                subTitle,
                                description,
                                action,
                              }: IProps) {
  const { value,step } = useProgressStore();
  const { orderType, currentType, currentStep } = useContactStore();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(round(value / step * 100))
  }, [step, value,]);

  if (!orderType) {
    return <></>;
  }

  const titleMap = {
    ALL: {
      title: "올인원 의뢰",
    },
    DESIGN: {
      title: "로고 디자인 의뢰",
    },
    APPLICATION: {
      title: "상표출원 의뢰",
    },
  };

  const title = titleMap[orderType].title;

  return (
      <div className="container pc:flex pc:gap-10">
        <div className="grid gap-6 py-8 pc:flex-1 pc:gap-8 pc:py-10">
          <h1 className="text-2xl font-bold pc:text-4xl">{title}</h1>

          <div className="flex justify-between">
            <div className="grid gap-2">
              <h2 className="text-lg font-bold text-surface-900 pc:text-2xl">
                {subTitle}
              </h2>
              <p className="font-medium text-surface-500 pc:text-lg">
                {description}
              </p>
            </div>
            <Progress
              size="lg"
              classNames={{
                base: "max-w-md",
                track: "drop-shadow-md border border-default",
                indicator: "bg-gradient-to-r from-primary-400 to-primary-700",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",
              }}
              label={`${value} / ${step}단계`}
              value={total}
              showValueLabel={true}
            />
          </div>

          <div className="h-px w-full bg-surface-100" />

          {children}
        </div>

        <div
          className="bg-white max-pc:sticky max-pc:bottom-0 max-pc:border-t max-pc:border-surface-100 max-pc:py-4 pc:sticky pc:top-[calc(80px)] pc:h-fit pc:w-[300px] pc:py-10">
          <div className="mb-4 max-pc:hidden">
            <DesktopSummary />
          </div>
          <div>{action}</div>
        </div>
      </div>
  );
}
