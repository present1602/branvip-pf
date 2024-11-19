import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function LogoSearchSection() {

  return (
    <div className="h-[308px] LS_bg w-screen flex justify-center items-center xl:h-[500px] relative">
      <Image className="absolute top-0 xl:hidden" src="/renewal/assets/images/ill/logosearch_bg.png" alt="creator_bg"
             width={375} height={308} />
      <div
        className="absolute w-full h-full flex-col flex items-center justify-center pt-[50px] gap-[22px] xl:pt-0 xl:gap-[41px]">
        <span className="LSS_title">지식재산이 되는<br className="xl:hidden" />로고 디자인의 새로운 기준,<br />브랜빕에게 문의하세요</span>
        <Link href={'/moods'}>
          <Button className="LSS_btn xl:w-[252px] xl:h-[70px]">
            <div className="flex justify-center items-center">
              <span className="LSS_btn_title">로고검색 바로가기</span>
              <svg className="xl:hidden" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
                   fill="none">
                <path
                  d="M7.55663 14.2641L12.8168 9.00313L7.55663 3.74219L5.97559 5.32323L9.65624 9.00313L5.97559 12.683L7.55663 14.2641Z"
                  fill="white" />
              </svg>
              <svg className="hidden xl:inline" xmlns="http://www.w3.org/2000/svg" width="25" height="24"
                   viewBox="0 0 25 24" fill="none">
                <path
                  d="M10.5615 19.0595L17.6215 11.9985L10.5615 4.9375L8.43945 7.0595L13.3795 11.9985L8.43945 16.9375L10.5615 19.0595Z"
                  fill="white" />
              </svg>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}