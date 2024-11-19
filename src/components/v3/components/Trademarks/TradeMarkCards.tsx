"use client";

import { ITrademarkCard } from "@/interfaces";
import { FC } from "react";
import TradeMarkCard from "@/components/v3/components/Trademarks/TradeMarkCard";

interface ITrademarkCardsProps {
  trademarks: ITrademarkCard[];
}

const TradeMarkCards: FC<ITrademarkCardsProps> = ({ trademarks }) => {
  return (
    <div className="grid grid-cols-2 gap-4 py-8 xl:grid-cols-5 xl:gap-9 xl:py-20">
      {trademarks.map((trademarks) => (
        <TradeMarkCard {...trademarks} key={trademarks.application_number} />
      ))}
    </div>
  );
};

export default TradeMarkCards;
