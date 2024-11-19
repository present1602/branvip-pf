import React from "react";
import Image from "next/image";

export default function PricingTitle() {
  return (
    <div className="grid gap-4 pc:grid-cols-2">
      <div className="flex flex-col gap-4 font-bold text-surface-900 pc:gap-6">
        <h1 className="text-3xl pc:text-4xl">비용 안내</h1>

        <div className="grid gap-1 text-xl font-medium pc:text-xl">
          <p>내게 맞는 맞춤형 서비스와</p>
          <p className="text-primary-500">예상 비용을 미리 확인해 보세요</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Image src={`/assets/pricing.png`} alt="pricing" className="max-pc:w-[250px]"
        width={500} height={350}/>
      </div>
    </div>
  );
}
