import SimilarTMCard from "@/app/(app)/trademark/[applicationId]/SimilarTMCard";
import React from "react";
import { ISimilarTrademark } from "@/interfaces";

interface ISimTMCardProps {
  trademarks: ISimilarTrademark[];
}

const SimilarTMCards: React.FC<ISimTMCardProps> = ({ trademarks }) => {
  return (
    <div className="flex gap-[11px] overflow-x-auto">
      {trademarks.map((card, index) => (
        <div key={index}>
          <SimilarTMCard
            application_number={card.application_number}
            image_url={card.image_url}
            status={card.status}
          />
        </div>
      ))}
    </div>
  );
};
export default SimilarTMCards;
