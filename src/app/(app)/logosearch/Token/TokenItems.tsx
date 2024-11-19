"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterToken from "@/components/v3/components/FilterToken/FilterToken";

const TokenItems = ({ allOptions }: any) => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const removeToken = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    newSearchParams.delete(key);
    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
    router.push(newUrl);
  };

  const handleAllRemove = () =>{
    router.push(`${window.location.pathname}`)
  }

  if (searchParams) {
    const token: any = [];
    token[0] = searchParams.get("mood_id");
    token[1] = searchParams.get("product_type");
    token[2] = searchParams.get("status");
    token[3] = searchParams.get("color_id");
    token[4] = searchParams.get("vienna_code");

    if (token[0]) {
      allOptions[3].map((option: any) => {
        if (option.value == token[0]) {
          token[0] = option.label;
        }
      });
    }

    if (token[1]) {
      allOptions[0].map((option: any) => {
        if (option.value == token[1]) {
          token[1] = option.label;
        }
      });
    }

    if (token[3]) {
      allOptions[1].map((option: any) => {
        if (option.value == token[3]) {
          token[3] = option.label;
        }
      });
    }

    if (token[4]) {
      allOptions[2].map((option: any) => {
        if (option.value == token[4]) {
          token[4] = option.label;
        }
      });
    }


    const getKeyFromIndex = (index: number) => {
      switch (index) {
        case 0:
          return "mood_id";
        case 1:
          return "product_type";
        case 2:
          return "status";
        case 3:
          return "color_id";
        case 4:
          return "vienna_code";
        default:
          return "";
      }
    };

    return (
      <>
        {token.every((t: string) => t === null) || (
          <div
            className="w-80 xl:w-full flex flex-col xl:flex-row xl:justify-between gap-5 border rounded-[6px] border-[#E3E6E8] bg-white px-3 py-2 mx-5 mb-4">
            <div className="px-4 py-2 flex gap-3 flex-wrap">
              {token.map((token: string, index: number) => (
                <FilterToken text={token} key={index}
                             onClick={() => removeToken(getKeyFromIndex(index))}
                />
              ))}
            </div>

            <button onClick={handleAllRemove}>
              <div className="flex justify-end p-1 items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M10.9922 0.947379C11.4064 0.947379 11.7422 1.28317 11.7422 1.69738L11.7422 4.5687C11.7422 4.76761 11.6632 4.95838 11.5225 5.09903C11.3819 5.23968 11.1911 5.3187 10.9922 5.3187L8.12087 5.3187C7.70665 5.3187 7.37087 4.98291 7.37087 4.5687C7.37087 4.15449 7.70665 3.8187 8.12087 3.8187L10.2422 3.8187L10.2422 1.69738C10.2422 1.28317 10.578 0.947379 10.9922 0.947379Z"
                        fill="#181818" />
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M6 2.5C3.51472 2.5 1.5 4.51472 1.5 7C1.5 9.48528 3.51472 11.5 6 11.5C8.48528 11.5 10.5 9.48528 10.5 7C10.5 6.58579 10.8358 6.25 11.25 6.25C11.6642 6.25 12 6.58579 12 7C12 10.3137 9.31371 13 6 13C2.68629 13 0 10.3137 0 7C0 3.68629 2.68629 1 6 1C7.88185 1 9.56172 1.86723 10.6606 3.22098C10.9216 3.54257 10.8725 4.0149 10.5509 4.27595C10.2293 4.537 9.75702 4.48792 9.49597 4.16632C8.66969 3.14839 7.41085 2.5 6 2.5Z"
                        fill="#181818" />
                </svg>
                <span className="text-xs text-[#181818]">
            초기화
          </span>
              </div>

            </button>
          </div>
        )}

      </>

    );


  }


};
export default TokenItems;