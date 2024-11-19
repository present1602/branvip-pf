import TrademarkCard from "../../../components/TrademarkCard";
import { ITrademarkCard } from "@/interfaces";

import React from "react";

interface ITrademarkCardsProps {
  trademarks: ITrademarkCard[];
}

export function TrademarkCards({ trademarks }: ITrademarkCardsProps) {
  return (
    <div className="container grid grid-cols-2 gap-x-2 gap-y-4 py-6 lg:grid-cols-6 lg:gap-8">
      {trademarks.map((trademark) => (
        <TrademarkCard {...trademark} key={trademark.application_number}/>
      ))}
    </div>
  );
}
