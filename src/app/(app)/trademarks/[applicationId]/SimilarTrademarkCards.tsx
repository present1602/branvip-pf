import TrademarkCard from "../../../../components/TrademarkCard";
import { ITrademarkCard } from "../../../../interfaces";

import React from "react";

interface ITrademarkCardsProps {
  trademarks: ITrademarkCard[];
}

export function SimilarTrademarkCards({ trademarks }: ITrademarkCardsProps) {
  return (
    <div className="container grid grid-cols-2 gap-x-4 gap-y-8 py-6 lg:grid-cols-6">
      {trademarks.map((trademark, i) => {
        if (i > 11) return null;
        return (
          <TrademarkCard {...trademark} key={trademark.id ?? i}></TrademarkCard>
        );
      })}
    </div>
  );
}
