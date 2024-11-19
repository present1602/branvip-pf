"use client";

import { FC } from "react";
import Image from "next/image";

const EmptyTMCards: FC = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-8 xl:py-20">
      <Image
        className="xl:hidden"
        src="/renewal/assets/images/ill/Empty.png"
        alt="empty"
        width={95}
        height={95}
      />
      <Image
        className="hidden xl:inline"
        src="/renewal/assets/images/ill/Empty.png"
        alt="empty"
        width={163}
        height={163}
      />
      <div className="text-[26px]">
        {/*<span className="text-[#8F8F8F]">	&lsquo;</span>*/}
        {/*<span className="text-[#0AB173]">브랜빕</span>*/}
        {/*<span className="text-[#8F8F8F]">	&lsquo;에 대한 검색결과가 없습니다.</span>*/}
        <span className="text-[#8F8F8F]"> 검색결과가 없습니다.</span>
      </div>
    </div>
  );
};

export default EmptyTMCards;
