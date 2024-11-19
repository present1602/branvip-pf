"use client";
import React from "react";
import { ITrademarkCard } from "@/interfaces";
import Image from "next/image";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import ScrapButton from "@/components/v3/components/Trademarks/ScrapButton";
import StatChip from "@/components/v3/components/StatChip/StatChip";

const TradeMarkCard: React.FC<ITrademarkCard> = (props) => {
  const { application_number, image_url, labels, status, thumbnail_url } =
    props;
  return (
    <div className="flex w-[160px] shrink-0 flex-col rounded-[6px] border bg-white shadow-sm hover:shadow-lg xl:w-60 xl:rounded-[10px]">
      {/*로고 이미지*/}
      <Link href={`/trademark/${application_number}`}>
        {/*<Skeleton className="rounded-2xl" isLoaded={isLoaded}>*/}
        <div className={"rounded-2xl"}>
          <div className="relative flex h-[122px] shrink-0 items-center justify-center p-2 xl:h-44">
            <Image
              className="p-4"
              src={thumbnail_url ?? ""}
              alt={application_number ?? ""}
              sizes={"120px"}
              fill
              style={{ objectFit: "contain" }}
              // onLoad={() => setIsLoaded(true)}
            />
          </div>
        </div>
        {/*</Skeleton>*/}
      </Link>

      <div className="flex h-[110px] shrink-0 flex-col gap-1.5 p-4 xl:h-40 xl:gap-2 xl:p-5">
        <div className="flex justify-end">
          <ScrapButton
            applicationNumber={application_number ?? ""}
            imageUrl={image_url ?? ""}
          />
        </div>
        <Link href={"/trademark/" + application_number}>
          <div className="flex flex-col justify-center  ">
            <div className="flex items-center overflow-hidden xl:max-w-[198px]">
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-base xl:text-xl ">
                {props.trademark_name == " "
                  ? props.trademark_name_name_en == " "
                    ? "상표명 정보 없음"
                    : props.trademark_name_name_en
                  : props.trademark_name}
              </span>
            </div>
          </div>
        </Link>
        <Link href={"/trademark/" + application_number}>
          <div className="mt-2 flex h-4 flex-1 items-center justify-between xl:mt-5">
            <div className="flex justify-start gap-1">
              {labels.map(({ label }, i) => {
                if (i > 1) return null;
                return (
                  <div
                    key={i}
                    className="flex h-4 items-center justify-center rounded-[3px] border border-[#DDD] px-1.5 xl:h-6 xl:rounded-[4px] xl:px-2"
                  >
                    <span className="text-[9px] text-[#858585] xl:text-[13px]">
                      {label.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="inline-flex items-center">
              <div className="xl:hidden">
                <StatChip stat={status ?? ""} size={"s"} />
              </div>
              <div className="hidden xl:inline">
                <StatChip stat={status ?? ""} size={"m"} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TradeMarkCard;
