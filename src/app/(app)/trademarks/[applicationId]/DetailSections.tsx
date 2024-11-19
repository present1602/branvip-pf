import { ITrademarkDetail } from "../../../../interfaces";
import React from "react";
import { DetailSectionLayout } from "./DetailSectionLayout";
import Divider from "./Divider";
import { AsignProductCard } from "./AsignProductCard";
import ListItem from "../../../../components/ListItem";
import {
  formatDateStringWithHyphen,
  formatTrademarkNumber,
} from "../../../../utils/formatters";
import { ProcessCard } from "./ProcessCard";

interface IDetailSectionsProps {
  trademark: ITrademarkDetail;
}

export function DetailSections({ trademark }: IDetailSectionsProps) {
  const asignProducts = trademark.asignProduct;
  const biblioSummaryInfo = trademark.biblioSummaryInfo[0];
  const applicantInfo = trademark.applicantInfo[0];
  const processes = trademark.administrativeMeasureInfo;

  // eg. 제16류 종이/인쇄물
  const asignProductText = `제${asignProducts[0].mainCode[0]}류 ${asignProducts[0].productName[0]}`;

  return (
    <div className="container grid gap-6 py-6 pc:py-10">
      <DetailSectionLayout title="상품류" primary={asignProductText} />
      <Divider />

      <DetailSectionLayout title="지정 상품 • 유사군 코드" scroll>
        <div className="flex flex-wrap gap-2">
          {asignProducts.map(({ productName, subCode, mainCode }) => (
            <AsignProductCard
              title={productName[0]}
              sub={subCode[0]}
              key={productName[0] + subCode[0]}
              productCode={mainCode[0]}
            />
          ))}
        </div>
      </DetailSectionLayout>
      <Divider />

      <DetailSectionLayout title="상표 정보">
        <div className="grid gap-4">
          <div className="grid gap-2 pc:grid-cols-2">
            <div className="grid gap-2">
              <ListItem
                title="상표명"
                textOnly
                text={biblioSummaryInfo.productName[0]}
              ></ListItem>
              <ListItem
                title="상표영문명"
                textOnly
                text={biblioSummaryInfo.productNameEng[0]}
              ></ListItem>
            </div>
            <div className="grid gap-2">
              <ListItem
                title="상태"
                textOnly
                text={biblioSummaryInfo.registerStatus[0]}
              ></ListItem>
              <ListItem
                title="상표 유형"
                textOnly
                text={biblioSummaryInfo.trademarkDivisionCode[0]}
              ></ListItem>
            </div>
          </div>
          <Divider />
          <div className="grid gap-2 pc:grid-cols-2">
            <div className="grid gap-2">
              <ListItem
                title="출원번호"
                textOnly
                text={formatTrademarkNumber({
                  value: biblioSummaryInfo.applicationNumber[0],
                })}
              />
              <ListItem
                title="출원일자"
                textOnly
                text={formatDateStringWithHyphen(
                  biblioSummaryInfo.applicationDate[0]
                )}
              />
              <ListItem
                title="출원인명"
                textOnly
                text={applicantInfo.nameKoreanLong[0]}
              />
              <ListItem
                title="출원인코드"
                textOnly
                text={applicantInfo.applicantCode[0]}
              />
            </div>
            <div className="grid gap-2">
              <ListItem
                title="등록일자"
                textOnly
                text={formatDateStringWithHyphen(
                  biblioSummaryInfo.registrationDate[0]
                )}
              />
              <ListItem
                title="등록번호"
                textOnly
                text={formatTrademarkNumber({
                  value: biblioSummaryInfo.registrationNumber[0],
                  isResigster: true,
                })}
              />
              <ListItem
                title="주소"
                textOnly
                text={applicantInfo.applicantAddress[0]}
              />
              <ListItem
                title="국적"
                textOnly
                text={applicantInfo.nationalCode[0]}
              />
            </div>
          </div>
        </div>
      </DetailSectionLayout>
      <Divider />

      <DetailSectionLayout title="행정 절차">
        {processes &&
          processes.map((p, i, l) => (
            <ProcessCard
              date={p.receiptSendDate[0]}
              title={p.receiptSendDocumentName[0]}
              state={p.processStateCode[0]}
              last={i === l.length - 1}
              key={i}
            />
          ))}
      </DetailSectionLayout>
    </div>
  );
}
