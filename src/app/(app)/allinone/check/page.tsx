"use server";

import {NextPage} from "next";
import SearchCheck from "@/app/(app)/allinone/check/SearchCheck";
import Link from "next/link";
import Button from "@/components/v3/components/BUI/Button/Button";

const CheckPage: NextPage = () => {
  return (
    <>
      <div className="flex w-[336px] flex-col  items-center leading-[34px] xl:mb-[92px] xl:mt-[190px] xl:w-auto">
        <span className="heading2 xl:title1 mb-[39px] mt-[60px] text-center xl:mb-[58px] xl:mt-0">
          <div>출원 의뢰 하기 전에</div>
          <div className="mt-[-10px] xl:mt-3">
            상표로 사용할 텍스트를 입력해보세요!
          </div>
        </span>
        <div className="w-full">
          <SearchCheck />
        </div>
        <div className="mb-[166px] mt-[119px] xl:mb-0 xl:mt-[136px]">
          <Link href={"/contact/init"}>
            <Button size="L">
              <span className="font-sans text-[18px] text-warm_gray_scale-50">
                출원의뢰 바로가기
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CheckPage;
