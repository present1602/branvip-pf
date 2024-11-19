"use client";

import { Key, useState } from "react";
import { trademarksSearch } from "@/utils/trademarksSearch";
import Image from "next/image";
import { ScrollShadow } from "@nextui-org/react";
import Input from "@/components/v3/components/BUI/Input/Input";
import Alert from "@/components/v3/components/BUI/Alert/Alert";
import Link from "next/link";

const SearchCheck = () => {
  const [stat, setStat] = useState<string>("default");
  const [value, setValue] = useState("");
  const [results, setResults] = useState<any>(null);

  const handleChange = (event: any) => {
    setValue(event.target.value);
    setStat("default");
  };

  const handleKeyDown = async (event: any) => {
    // Enter 키의 keyCode는 13입니다. (key: 'Enter' 로도 확인 가능)
    if (event.key === "Enter") {
      // 여기에 Enter 키를 눌렀을 때 실행할 함수를 호출
      await handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      if (value.trim()) {
        const searchResults = await trademarksSearch(value);
        if (
          searchResults.response.body[0].items[0].TotalSearchCount[0] == "0"
        ) {
          setResults(null);
          setStat("success");
        } else {
          setResults(searchResults.response.body[0].items[0].TradeMarkInfo);
          setStat("error");
        }
      }
    } catch (e) {
      console.log("err");
    }
  };

  const handleClear = () => {
    setValue("");
    setStat("default");
    setResults("");
  };

  return (
    <>
      <div className="flex w-full flex-col items-center gap-12">
        <div className="w-[268px] xl:w-[650px]">
          <Input
            value={value}
            onChange={handleChange}
            stat={stat}
            onKeyDown={handleKeyDown}
            onClear={handleClear}
          />
        </div>
        <div className="flex">
          {stat == "success" ? (
            <div className="flex justify-center">
              <Alert
                size={1}
                type={""}
                description={
                  "다만 상표 등록가능성은 동일한 상표가 검색되지 않더라도 고려할 여러 요소가 있으니 검토가 필요하다면 브랜빕에게 문의해 보세요."
                }
              />
            </div>
          ) : (
            <ScrollShadow
              orientation="horizontal"
              offset={10}
              className="flex w-screen gap-2 overflow-x-auto pb-2 pl-5 xl:w-[650px] xl:gap-3"
            >
              {results &&
                results.map((tm: any, index: Key | null | undefined) => (
                  <div
                    key={index}
                    className="flex h-[134px] w-[134px] flex-shrink-0 items-center justify-center rounded-[9px] border-[0.5px] border-gray_scale-90 hover:shadow-md xl:h-[150px] xl:w-[150px] xl:rounded-[15px] xl:border-1"
                  >
                    <Link href={`/trademark/${tm.ApplicationNumber}`}>
                      <Image
                        src={tm.ImagePath[0]}
                        alt={"text"}
                        width={100}
                        height={100}
                      />
                    </Link>
                  </div>
                ))}
            </ScrollShadow>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchCheck;
