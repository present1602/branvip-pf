"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { ITrademarkDetail } from "../../../../interfaces";
import React from "react";
import { SimilarTrademarkCards } from "./SimilarTrademarkCards";
import { DetailSections } from "./DetailSections";

interface IDetailTabsProps {
  trademark: ITrademarkDetail;
}

export function DetailTabs({ trademark }: IDetailTabsProps) {
  const similarTrademarkCards =
    trademark?.similarTrademarks.map(
      ({ application_number, image_url, status }) => ({
        application_number,
        image_url,
        status,
        labels: [],
      })
    ) ?? [];

  return (
    <div className="pb-20 pc:container">
      <Tabs defaultValue="similar">
        <TabsList className="w-full">
          <TabsTrigger value="similar" className="w-1/2">
            비슷한 상표
          </TabsTrigger>
          <TabsTrigger value="detail" className="w-1/2">
            상세 정보
          </TabsTrigger>
        </TabsList>
        <TabsContent value="similar">
          <SimilarTrademarkCards trademarks={similarTrademarkCards} />
          {!similarTrademarkCards.length && (
            <p className="text-center text-surface-500">
              비슷한 상표는 디자인이 적용된 상표에만 추천됩니다.
              <br />이 상표에 대한 정보는 ‘상세 정보’에서 확인해 보세요.
            </p>
          )}
        </TabsContent>
        <TabsContent value="detail">
          <DetailSections trademark={trademark} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
