import React, { FC } from "react";
import { TMProps } from "@/app/(app)/trademark/[applicationId]/TMInfo";
import SimilarTMCards from "@/app/(app)/trademark/[applicationId]/SimilarTMCards";
import ProcessCard from "@/app/(app)/trademark/[applicationId]/ProcessCard";
import TMDetailProduct from "@/app/(app)/trademark/[applicationId]/TMDetailProduct";
import ViennaBtn from "@/app/(app)/trademark/[applicationId]/component/ViennaBtn";
import { IViennaCodeInfo } from "@/interfaces";
import AssignBtn from "./component/AssignBtn";

const TMDetailInfo: FC<TMProps> = ({ tm }) => {
  const viennaCodes = tm.viennaCodeInfo;
  const assignProducts = tm.asignProduct;
  const processes = tm.administrativeMeasureInfo;

  return (
    <div className="mt-[43px] flex w-[335px] flex-col gap-5 xl:mt-[16px] xl:gap-4">
      <TMDetailProduct tm={tm} />
      {viennaCodes && viennaCodes.length > 0 && (
        <div className="flex flex-col xl:w-[1240px] xl:flex-row xl:items-center xl:rounded-[10px] xl:border xl:px-10 xl:py-5">
          <span className="text-[18px] font-semibold xl:w-[70px] xl:shrink-0 xl:text-[15px] xl:text-gray_scale-500">
            상표모양
          </span>
          <div className="mt-[12px] flex flex-wrap gap-[10px] rounded-[10px] border border-gray_scale-90 p-[10px] xl:mt-0 xl:border-0">
            {viennaCodes.map((vienna: IViennaCodeInfo, index: number) => (
              <div key={index}>
                <ViennaBtn vienna={vienna} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="xl:mt-5 xl:w-[1240px]">
        <span className=" xl:heading1 text-[18px] font-semibold ">
          비슷한 상표
        </span>
        <div className="mt-3 h-full">
          <SimilarTMCards trademarks={tm?.similarTrademarks} />
          {!tm?.similarTrademarks.length && (
            <p className="text-center text-surface-500">
              비슷한 상표는 디자인이 적용된 상표에만 추천됩니다.
            </p>
          )}
        </div>
      </div>
      <div className="xl:mt-5 xl:w-[1240px]">
        <span className="xl:heading1 text-[18px] font-semibold ">지정상품</span>
        <div className="mt-[12px] flex h-[200px] flex-wrap gap-[10px] overflow-y-auto rounded-[10px] border border-gray_scale-90 p-[10px] xl:h-full xl:gap-[20px] xl:p-10">
          {assignProducts.map((assignProduct, index) => (
            <div key={index}>
              <AssignBtn assignProduct={assignProduct} />
            </div>
          ))}
        </div>
      </div>
      <div className="xl:mt-5 xl:w-[1240px]">
        <span className="xl:heading1 text-[18px] font-semibold">행정절차</span>
        <div className="mt-[12px] flex h-[250px] flex-col overflow-y-auto rounded-[10px] border border-gray_scale-90 p-[10px] xl:h-full xl:p-10">
          {processes &&
            processes.map((p: any, index: number, l: any) => (
              <ProcessCard
                key={index}
                date={p.receiptSendDate[0]}
                title={p.receiptSendDocumentName[0]}
                state={p.processStateCode[0]}
                last={index === l.length - 1}
              />
            ))}
        </div>
      </div>
      {/*<div className="xl:mt-5 xl:w-[1240px]">*/}
      {/*  <span className="xl:heading1 text-[18px] font-semibold">*/}
      {/*    마드리드 출원현황*/}
      {/*  </span>*/}
      {/*  <div className="mt-3 flex flex-col xl:w-[1240px] xl:flex-row xl:items-center xl:rounded-[10px] xl:border xl:px-10 xl:py-5">*/}
      {/*    <span className="text-[18px] font-semibold xl:w-[120px] xl:text-[15px] xl:text-gray_scale-500">*/}
      {/*      국제등록번호(일자)*/}
      {/*    </span>*/}
      {/*    {tm.biblioSummaryInfo[0].internationalRegisterNumber[0]}(*/}
      {/*    {tm.biblioSummaryInfo[0].internationalRegisterDate[0]})*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
export default TMDetailInfo;
