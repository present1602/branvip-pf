import React from "react";
import { HeaderWithFilters } from "./HeaderWithFilters";
import { trademarkService } from "@/services/trademark.service";
import { TrademarkCards } from "./TrademarkCards";
import { PageNavigation } from "@/components/PageNavigation";

export interface PageProps {
  searchParams: Record<string, string>;
}

export default async function TrademarksPage({ searchParams }: PageProps) {
  const { mood_id, color_id, product_type, vienna_code, status, offset } =
    searchParams;

  const { trademarks, totalCount } =
    await trademarkService.getFilteredTrademarks({
      mood_id: +mood_id,
      color_id: +color_id,
      product_type_code: product_type,
      vienna_code,
      status,
      offset: +offset || 0,
      limit: 60,
    });

  return (
    <>
      <HeaderWithFilters />
      <TrademarkCards trademarks={trademarks} />


      <PageNavigation total={totalCount} />
    </>
  );
}
