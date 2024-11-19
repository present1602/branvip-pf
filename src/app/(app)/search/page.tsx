import React from "react";
import { TrademarkCards } from "../trademarks/TrademarkCards";
import { ITrademarkCard } from "@/interfaces";
import { PageNavigation } from "@/components/PageNavigation";
import { kiprisServiceV2 } from "@/services/kipris_v2.service";
import { SearchHeaderWithFilters } from "@/app/(app)/search/SearchHeaderWithFilters";

interface IProps {
  searchParams: {
    keyword?: string;
    offset?: number;
    status?: string;
    product_type?: string;
    vienna_code?: string;
  };
}

export default async function SearchPage({ searchParams }: IProps) {
  const { keyword, offset, status, product_type, vienna_code } = searchParams;

  const { totalCount, trademarks } =
    await kiprisServiceV2.getTrademarksBySearch({
      keyword: keyword ?? "",
      status: status ?? "",
      product_type: product_type ?? "",
      offset: offset ?? 0,
      vienna_code: vienna_code ?? "",
      limit: 30,
    });

  const props: ITrademarkCard[] = trademarks.map((t) => ({
    application_number: t.application_number,
    image_url: t.image_url,
    status: t.status,
    labels: [],
  }));

  return (
    <>
      <SearchHeaderWithFilters />

      {!!keyword?.trim() && !!totalCount && (
        <div className="container py-4">
          <span className="font-bold text-primary-500">{keyword?.trim()}</span>
          <span className="text-surface-500"> 검색 결과 ({totalCount})</span>
        </div>
      )}

      {totalCount === 0 && (
        <div className="container py-10 text-center">
          <div className="text-2xl font-bold text-surface-700">
            검색 결과가 없습니다.
          </div>
          <div className="text-lg text-surface-500">
            다른 검색어로 검색해보세요.
          </div>
        </div>
      )}

      <TrademarkCards trademarks={props} />
      <PageNavigation total={totalCount} />
    </>
  );
}
