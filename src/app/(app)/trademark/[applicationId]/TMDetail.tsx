"use client";

import React, { FC } from "react";
import { TMProps } from "@/app/(app)/trademark/[applicationId]/TMInfo";
import TMLogo from "@/app/(app)/trademark/[applicationId]/TMLogo";
import TMDetailColor from "@/app/(app)/trademark/[applicationId]/TMDetailColor";
import TMDetailMood from "@/app/(app)/trademark/[applicationId]/TMDetailMood";

const TMDetail: FC<TMProps> = ({ tm }) => {
  const [tmBiblio] = React.useState(tm.biblioSummaryInfo[0] || "");
  const [tmApplicantInfo] = React.useState(tm.applicantInfo[0] || "");

  return (
    <div className="flex flex-col xl:w-[1240px] xl:flex-row xl:items-center xl:justify-start xl:gap-[50px] xl:rounded-[10px] xl:border xl:border-gray_scale-80 xl:p-5">
      <TMLogo tm={tm} />
      <div className="items-starts mt-3 flex flex-col xl:mt-0 xl:flex-row">
        <div className="flex flex-col gap-[10px] xl:w-[310px] xl:gap-[15px] xl:border-r xl:p-[20px]">
          <div className="flex">
            <span className="w-[80px] text-[14px] text-gray-600 xl:text-[15px] xl:font-semibold xl:text-gray_scale-500">
              출원일자
            </span>
            <span className="text-[14px] xl:text-[15px] xl:font-semibold">
              {tmBiblio.applicationDate[0].substring(0, 4) +
                "-" +
                tmBiblio.applicationDate[0].substring(4, 6) +
                "-" +
                tmBiblio.applicationDate[0].substring(6, 8)}
            </span>
          </div>
          <div className="flex">
            <span className="w-[80px] text-[14px] text-gray-600 xl:text-[15px] xl:font-semibold xl:text-gray_scale-500">
              출원번호
            </span>
            <span className="text-[14px] xl:text-[15px] xl:font-semibold">
              {tmBiblio.applicationNumber[0].substring(0, 2) +
                "-" +
                tmBiblio.applicationNumber[0].substring(2, 6) +
                "-" +
                tmBiblio.applicationNumber[0].substring(
                  6,
                  tmBiblio.applicationNumber[0].length
                )}
            </span>
          </div>
          <div className="flex">
            <span className="w-[80px] text-[14px] text-gray-600 xl:text-[15px] xl:font-semibold xl:text-gray_scale-500">
              등록일자
            </span>
            <span className="text-[14px] xl:text-[15px] xl:font-semibold">
              {tmBiblio.registrationDate[0].substring(0, 4) +
                "-" +
                tmBiblio.registrationDate[0].substring(4, 6) +
                "-" +
                tmBiblio.registrationDate[0].substring(6, 8)}
            </span>
          </div>
          <div className="flex">
            <span className="w-[80px] text-[14px] text-gray-600 xl:text-[15px] xl:font-semibold xl:text-gray_scale-500">
              등록번호
            </span>
            <span className="text-[14px] xl:text-[15px] xl:font-semibold">
              {tmBiblio.registrationNumber[0].substring(0, 2) +
                "-" +
                tmBiblio.registrationNumber[0].substring(2, 9) +
                "-" +
                tmBiblio.registrationNumber[0].substring(
                  9,
                  tmBiblio.registrationNumber[0].length
                )}
            </span>
          </div>
          <div className="flex">
            <span className="w-[80px] text-[14px] text-gray-600 xl:text-[15px] xl:font-semibold xl:text-gray_scale-500">
              출원인명
            </span>
            <span className="text-[14px] xl:text-[15px] xl:font-semibold">
              {tmApplicantInfo.nameKoreanLong[0]}
            </span>
          </div>
        </div>
        <div className="mt-5 xl:mt-0 xl:p-[20px]">
          <div className="flex flex-col gap-[10px] xl:w-[310px] xl:gap-[15px]">
            <div className="flex xl:gap-2">
              <span className="w-[80px] text-[14px] text-gray-600 xl:text-[15px] xl:font-semibold xl:text-gray_scale-500">
                특허고객번호
              </span>
              <span className="text-[14px] xl:text-[15px] xl:font-semibold">
                {tmApplicantInfo.applicantCode[0]}
              </span>
            </div>
            <div className="flex xl:gap-2">
              <span className="w-[80px] text-[14px] text-gray-600 xl:text-[15px] xl:font-semibold xl:text-gray_scale-500">
                국적
              </span>
              <span className="text-[14px] xl:text-[15px] xl:font-semibold">
                {tmApplicantInfo.nationalCode[0]}
              </span>
            </div>
            <TMDetailColor tm={tm} />
            <TMDetailMood tm={tm} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TMDetail;
