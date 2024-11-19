import { DefaultLayout } from "@/components/layouts";
import { kiprisService } from "@/services";
import Image from "next/image";
import React from "react";
import { DetailTabs } from "./DetailTabs";
import { TrademarkSummary } from "./TrademarkSummary";
import { ScrapButton } from "./ScrapButton";
import { PdfButton } from "./PdfButton";
import { trademarkService } from "@/services/trademark.service";

interface ITrademarkDetailPageProps {
  params: {
    applicationId: string;
  };
}

export default async function TrademarkDetailPage({
  params: { applicationId },
}: ITrademarkDetailPageProps) {
  const trademark = await kiprisService.getTrademarkDetail(applicationId);

  // 로고 상세 페이지와 기존 DB와 로고 상태를 비교해서 최신 상태로 변경
  if (trademark) {
    const status = trademark.biblioSummaryInfo[0].registerStatus[0];
    const mainCode = trademark.asignProduct[0].mainCode[0];
    const productName = trademark.asignProduct[0].productName[0];
    await trademarkService.changeTrademarkStatus(applicationId, status);

    const pdfUrl =
      trademark.rejectPdfUrl || trademark?.publicationInfo?.[0]?.path[0] || "";

    // 이미지 크기에 맞춰서 여백을 추가함
    return (
      <DefaultLayout useMobileBackButton>
        <div className="container max-pc:px-0 pc:flex pc:gap-6 pc:py-10">
          <div className="h-[400px] w-[400px] overflow-hidden rounded-2xl border border-surface-100 object-contain object-center pc:flex pc:items-center">
            <Image
              src={trademark.sampleImageInfo[0].path[0]}
              alt="trademark logo"
              width={400}
              height={400}
              className="h-full w-full object-contain object-center"
            />
          </div>
          <div className="grid gap-6 rounded-2xl border border-surface-100 px-4 py-6 pc:flex pc:flex-1 pc:flex-col pc:justify-start pc:gap-4 pc:px-6">
            <div className="grid gap-6 pc:flex pc:items-center pc:justify-between">
              <h5 className="text-2xl font-bold text-surface-900">상표 정보</h5>
              <div className="flex items-center gap-2">
                <ScrapButton
                  applicationNumber={applicationId}
                  imageUrl={trademark.sampleImageInfo[0].path[0]}
                />
                {pdfUrl && (
                  <PdfButton
                    pdfUrl={pdfUrl}
                    isRejected={!!trademark.rejectPdfUrl}
                  />
                )}
              </div>
            </div>
            <div className="h-px w-full bg-slate-200" />
            <TrademarkSummary trademark={trademark} />
          </div>
        </div>

        <DetailTabs trademark={trademark} />
      </DefaultLayout>
    );
  }
}
