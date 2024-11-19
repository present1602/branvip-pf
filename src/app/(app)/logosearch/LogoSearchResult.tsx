"use client";
import React, { FC } from "react";

import EmptyTMCards from "@/app/(app)/logosearch/EmptyTMCards";
import { ITrademarkCard } from "@/interfaces";
import TradeMarkCards from "@/components/v3/components/Trademarks/TradeMarkCards";
import Pagination from "@/components/v3/components/Pagination/Pagination";

interface IProps {
  trademarks: ITrademarkCard[];
  total: number;
}

const LogoSearchResult: FC<IProps> = ({ trademarks, total }) => {
  return (
    <div className="flex flex-col items-center justify-center xl:max-w-[1350px]">
      {trademarks.length == 0 ? (
        <EmptyTMCards />
      ) : (
        <TradeMarkCards trademarks={trademarks} />
      )}
      <Pagination total={total} />
    </div>
  );
};

export default LogoSearchResult;
