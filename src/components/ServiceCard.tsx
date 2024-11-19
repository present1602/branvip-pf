"use client";

import { StaticImageData } from "next/image";
import React from "react";
import Image from "next/image";
import AllImage from "../assets/pricing-all.png";
import DesignImage from "../assets/pricing-design.png";
import ApplicationImage from "../assets/pricing-application.png";
import { Icon } from "./ui";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/hooks/progress.store";
import { useSession } from "next-auth/react";

interface IServiceCardProps {
  subTitle: string;
  title: string;
  description: string;
  discount?: boolean;
  href?: string;
  image: StaticImageData;
}

export const serviceCardAllInOne = {
  subTitle: "브랜빕의 획기적인",
  title: "올인원 솔루션",
  discount: true,
  description: `로고 디자인과 상표출원을\n함께 진행하고 싶어요.`,
  image: AllImage,
};
export const serviceCards: IServiceCardProps[] = [
  {
    subTitle: "지식재산이 되는",
    title: "로고 디자인",
    description: `법적으로 안전하고 나에게 꼭 맞는\n 디자인을 의뢰하고 싶어요.
    `,
    image: DesignImage,
  },
  {
    subTitle: "브랜드의 재산화",
    title: "상표출원",
    description: `상표출원을 통해 이름 또는 디자인을\n 법적으로 인정받고 싶어요. `,
    image: ApplicationImage,
  },
];

export const ServiceCard: React.FC<IServiceCardProps> = ({
  title,
  subTitle,
  description,
  image,
  href,
}) => {
  const router = useRouter();
  const { setStep, setProgressValue } = useProgressStore();
  const session = useSession();

  function handleClick() {
    if (session.status == "unauthenticated") {
      return router.push(`/login?callBackUrl=${href}`);
    }
    setProgressValue(1);

    if (title == "올인원 솔루션") {
      setStep(4);
    } else if (title == "로고 디자인") {
      setStep(2);
    } else if (title == "상표출원") {
      setStep(3);
    }

    if (href) {
      router.push(href);
    }
  }

  return (
    <div
      className={cn(
        "group grid gap-6 rounded-2xl border border-surface-100 bg-white p-6 ",
        href && "cursor-pointer transition-shadow hover:shadow-md"
      )}
      onClick={handleClick}
    >
      <Image src={image} alt={title} width={48} height={48} />
      <div className="flex items-end">
        <div className="grid flex-1 gap-2">
          <div className="grid items-end gap-2 font-bold text-surface-700">
            {!href && <p className="pc:text-lg">{subTitle}</p>}
            <span className="text-lg  pc:text-2xl">{title}</span>
          </div>

          <p className="whitespace-pre-line font-medium text-surface-500 pc:text-lg">
            {description}
          </p>
        </div>
        {href && (
          <Icon
            name="ArrowRightIcon"
            size="lg"
            className="text-surface-200 group-hover:text-primary-500 max-pc:text-primary-500"
          />
        )}
      </div>
    </div>
  );
};
