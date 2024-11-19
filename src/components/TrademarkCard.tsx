"use client";

import { ITrademarkCard } from "@/interfaces";
import Image from "next/image";
import React, { useState } from "react";
import TrademarkStatusTag from "./TrademarkStatusTag";
import Link from "next/link";

export default function TrademarkCard(props: ITrademarkCard) {
  const { application_number, image_url, labels, status } = props;
  const [, setIsLoaded] = useState(false);

  return (
    <Link
      href={"/trademark/" + application_number}
      className="group grid gap-4 rounded-2xl border p-2 shadow transition-all hover:border-primary-300 hover:shadow-lg lg:p-4 "
    >
      <div className="aspect-square rounded-2xl">
        <Image
          src={image_url ?? ""}
          alt={application_number ?? ""}
          width={100}
          height={100}
          className="h-full w-full rounded-2xl object-contain object-center"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <div className="w-full bg-surface-100" />
      <div className="flex justify-between">
        <div className="w-fit">
          <TrademarkStatusTag status={status ?? ""} />
        </div>
        {labels && labels.length > 0 && (
          <div className="flex gap-1 lg:gap-2">
            {labels.map(({ label }, i) => {
              if (i > 1) return null;
              return (
                <div key={label.id} className="flex items-center gap-1">
                  <span>
                    <Image
                      src={label.image_url ?? ""}
                      alt={label.title ?? ""}
                      width={20}
                      height={20}
                    ></Image>
                  </span>
                  <span className="text-sm font-medium text-surface-600">
                    {label.title}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}
