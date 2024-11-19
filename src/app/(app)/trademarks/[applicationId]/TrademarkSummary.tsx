import ListItem from "../../../../components/ListItem";
import React from "react";
import Divider from "./Divider";
import { ITrademarkDetail } from "@/interfaces";
import TrademarkStatusTag from "../../../../components/TrademarkStatusTag";
import { TrademarkSummaryTag } from "./TrademarkSummaryTag";

interface IProps {
  trademark: ITrademarkDetail;
}

export function TrademarkSummary({ trademark }: IProps) {
  const biblioSummaryInfo = trademark.biblioSummaryInfo[0];
  const asignProductMainCode = `제${trademark.asignProduct[0].mainCode[0]}류`;
  const asignProductTitle = trademark.asignProduct[0].productName[0];
  const viennaCodes = trademark.viennaCodeInfo;

  return (
    <ul className="flex flex-col gap-3">
      <ListItem title="업종">
        <TrademarkSummaryTag
          title={asignProductTitle}
          subTitle={asignProductMainCode}
        />
      </ListItem>
      <Divider />
      {trademark.moods && trademark.moods.length > 0 && (
        <>
          <ListItem title="분위기">
            <div className="flex gap-2">
              {trademark.moods.map((mood, index) => (
                <TrademarkSummaryTag
                  key={index}
                  title={mood.title ?? ""}
                  imageUrl={mood.imageUrl ?? ""}
                />
              ))}
            </div>
          </ListItem>
          <Divider />
        </>
      )}
      {trademark.colors && trademark.colors.length > 0 && (
        <>
          <ListItem title="색상">
            <div className="flex gap-2">
              {trademark.colors.map((color, index) => (
                <TrademarkSummaryTag
                  key={index}
                  title={color.title ?? ""}
                  imageUrl={color.imageUrl ?? ""}
                />
              ))}
            </div>
          </ListItem>
          <Divider />
        </>
      )}
      {viennaCodes && viennaCodes.length > 0 && (
        <>
          <ListItem title="상표 모양">
            <div className="flex flex-wrap gap-2">
              {viennaCodes.map((code, index) => (
                <TrademarkSummaryTag
                  key={index}
                  title={code.viennaCodeDescription[0] ?? ""}
                />
              ))}
            </div>
          </ListItem>
          <Divider />
        </>
      )}
      <ListItem title="등록상태">
        <TrademarkStatusTag status={biblioSummaryInfo.registerStatus[0]} />
      </ListItem>
    </ul>
  );
}
