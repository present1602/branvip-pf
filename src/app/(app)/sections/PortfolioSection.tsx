import {Image} from "@nextui-org/react";

const img_src = [
  "/renewal/assets/images/ill/6-1.png",
  "/renewal/assets/images/ill/6-2.png",
  "/renewal/assets/images/ill/6-3.png",
  "/renewal/assets/images/ill/6-4.png",
  "/renewal/assets/images/ill/6-5.png",
  "/renewal/assets/images/ill/6-6.png",
  "/renewal/assets/images/ill/6-7.png",
  "/renewal/assets/images/ill/6-8.png",
  "/renewal/assets/images/ill/6-9.png",
  "/renewal/assets/images/ill/6-10.png",
  "/renewal/assets/images/ill/6-11.png",
  "/renewal/assets/images/ill/6-12.png",
]
export default function PortfolioSection(){
  return (
    <div>

    <div className="flex flex-col justify-center items-center pb-[32px] pt-14 xl:1300px xl:pb-[130px]">
      <div className="text-[26px] font-bold leading-[38px] text-center mb-8 xl:text-[48px] xl:leading-[78px] xl:mb-[92px]">
        <span>로고제작 고민,&nbsp;<span className="pc:hidden"><br/></span>브랜빕이 해결해드려요!</span>
      </div>
      <div>
        <div className="grid grid-cols-2 w-[340px] gap-[4px] xl:grid-cols-4 xl:w-full xl:gap-[6px] ">
          {img_src && img_src.map((src ,index) => (
            <div key={index} className="relative w-[168px] h-[168px] xl:w-[316px] xl:h-[316px]" >
              <Image src={src} alt={'test'} style={{objectFit:"contain"}} radius="none" sizes="65565px" isZoomed/>
            </div>
          )
          )}
        </div>
      </div>
    </div>
    </div>
  )
}