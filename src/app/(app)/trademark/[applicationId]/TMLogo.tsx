"use client";

import Image from "next/image";
import TMReadMore from "@/app/(app)/trademark/[applicationId]/TMReadMore";
import { FillScrapIcon, Scrap } from "@/components/svg";
import PdfButton from "@/app/(app)/trademark/[applicationId]/PdfButton";
import React from "react";
import { TMProps } from "@/app/(app)/trademark/[applicationId]/TMInfo";
import { useToast } from "@/components/ui/use-toast";
import { useScrapStore } from "@/hooks/scrap.store";

const TMLogo: React.FC<TMProps> = ({ tm }) => {
  const { toast } = useToast();
  const { trademarks, setTrademarks, setModalOpened } = useScrapStore();

  const applicationNumber = tm.biblioSummaryInfo[0].applicationNumber[0];
  const imageUrl = tm.sampleImageInfo[0].path[0];

  const isScrapped = trademarks
    .map(({ applicationNumber }) => applicationNumber)
    .includes(applicationNumber);

  const tmScrap = () => {
    if (isScrapped) {
      setTrademarks(
        trademarks.filter((v) => v.applicationNumber !== applicationNumber)
      );
      toast({
        title: "상표 스크랩을 취소했습니다.",
      });
    } else {
      setTrademarks([
        ...trademarks,
        {
          applicationNumber,
          imageUrl,
        },
      ]);

      setModalOpened(true);

      toast({
        title: "상표를 저장했습니다.",
        description: "스크랩한 상표는 디자인 문의에서 확인할 수 있습니다.",
      });
    }
  };

  return (
    <div className="relative mt-[22px]  flex h-[236px] w-[335px] flex-col items-center gap-[20px] rounded-[10px] border border-gray_scale-90 py-[20px] xl:mt-0 xl:h-full ">
      <div className="rounded-2xl">
        <div className="relative flex h-[140px] w-[281px] items-center justify-center">
          <Image
            src={tm.sampleImageInfo[0].path[0]}
            alt={tm.sampleImageInfo[0].imageName[0]}
            sizes={"100px"}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <TMReadMore tm={tm.sampleImageInfo[0]} />
      <div className="flex items-center justify-center gap-[10px] text-[14px] xl:text-base">
        {isScrapped ? (
          <button
            className="flex gap-1 rounded-[4px] border border-primary_scale-70 p-[10px] hover:shadow-md"
            onClick={tmScrap}
          >
            <span className=" font-semibold text-primary_scale-60 ">
              &nbsp;&nbsp;&nbsp;&nbsp;스크랩취소
            </span>
            <div className="flex">
              <FillScrapIcon />
              &nbsp;&nbsp;
            </div>
          </button>
        ) : (
          <button
            className="flex items-center gap-1 rounded-[4px] border border-primary_scale-70 p-[10px] hover:shadow-md"
            onClick={tmScrap}
          >
            <span className="font-semibold text-primary_scale-60">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;스크랩
            </span>
            <Scrap />
            &nbsp;&nbsp;&nbsp;
          </button>
        )}
        <PdfButton tm={tm} />
      </div>
    </div>
  );
};

export default TMLogo;
