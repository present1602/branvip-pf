"use client";

import Image from "next/image";
import { ISimilarTrademark } from "@/interfaces";
import Link from "next/link";
import React from "react";

const SimilarTMCard: React.FC<ISimilarTrademark> = (tm) => {
  return (
    <Link href={`/trademark/${tm.application_number}`}>
      <div className="rounded-2xl">
        <div className="relative flex h-[128px] w-[175px] items-center justify-center rounded-md border">
          <Image
            className="p-2"
            src={tm.image_url}
            alt={tm.application_number}
            fill
            style={{ objectFit: "contain" }}
            sizes={"100px"}
          />
        </div>
      </div>
    </Link>
  );
};

export default SimilarTMCard;
