"use client";

import StatChip from "@/components/v3/components/StatChip/StatChip";
import React, { FC } from "react";
import { TMProps } from "@/app/(app)/trademark/[applicationId]/TMInfo";

const TMTitleAndStatus: FC<TMProps> = ({ tm }) => {
  const [korean] = React.useState(tm.biblioSummaryInfo[0].productName[0]);
  const [english] = React.useState(tm.biblioSummaryInfo[0].productNameEng[0]);
  const [status] = React.useState(tm.biblioSummaryInfo[0].registerStatus[0]);

  let title;

  if (korean != " " && english != " ") {
    title = `${korean}  |  ${english}`;
  } else if (korean != " ") {
    title = korean;
  } else if (english != " ") {
    title = english;
  } else {
    title = "상표명 정보 없음";
  }

  return (
    <div className="mt-[30px] flex flex-col xl:mb-[24px] xl:mt-[55px] xl:flex-row xl:gap-4">
      <div className="xl:heading1 heading2 flex max-w-[335px] items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide xl:max-w-full xl:gap-3">
        {/*{korean == " " && english == " " ? (*/}
        {/*  "상표명 정보 없음"*/}
        {/*) : (*/}
        {/*  <>*/}
        {/*    <span className="">*/}
        {/*      {korean == " " ? "한글 상표명 정보 없음" : korean}*/}
        {/*    </span>*/}
        {/*    <ColBar />*/}
        {/*    <span className="">*/}
        {/*      {english == " " ? "영문 상표명 정보 없음" : english}*/}
        {/*    </span>*/}
        {/*  </>*/}
        {/*)}*/}
        {title}
      </div>
      <div className="mt-[10px] xl:hidden">
        <StatChip stat={status} size={"m"} />
      </div>
      <div className="mt-1 hidden xl:inline">
        <StatChip stat={status} size={"l"} />
      </div>
    </div>
  );
};

export default TMTitleAndStatus;
