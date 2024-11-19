import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function CreatorSection() {

  return (
    <div className="xl:h-[600px] xl:flex xl:items-center xl:justify-center">
      <div className="relative  w-[336px] h-[305px] my-[20px] xl:w-[1283px] xl:h-[406px]">
        <Image className="absolute top-0 xl:hidden" src="/renewal/assets/images/ill/creator_bg.png" alt="creator_bg"
               width={336} height={305} />
        <Image className="absolute top-0 hidden xl:inline" src="/renewal/assets/images/ill/8-1.png" alt="creator_bg"
               width={1283} height={406} />
        <div className="absolute flex-col flex pt-[30px] pl-[29px] xl:pt-[86px] xl:pl-[127px] gap-[14px] xl:gap-[36px]">
          <span className="CS_title">브랜빕과 함께 <br /> 로고 디자인을 완성해 주세요</span>
          <Link href={"https://forms.gle/6WZRUyk68FJnWoCn6"} target={'_blank'}>
            <Button className="CS_btn xl:w-[236px] xl:h-[70px] flex justify-center items-center">
              <div className="flex justify-center items-center xl:gap-[10px]">
                <span className="CS_btn_title">창작자 신청하기</span>
                <svg className="xl:hidden" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18"
                     fill="none">
                  <path
                    d="M8.05663 14.2641L13.3168 9.00313L8.05663 3.74219L6.47559 5.32323L10.1562 9.00313L6.47559 12.683L8.05663 14.2641Z"
                    fill="#0AB173" />
                </svg>
                <svg className="hidden xl:inline" xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                     viewBox="0 0 25 25" fill="none">
                  <path
                    d="M10.0849 19.8095L17.1449 12.7485L10.0849 5.6875L7.96289 7.8095L12.9029 12.7485L7.96289 17.6875L10.0849 19.8095Z"
                    fill="#0AB173" />
                </svg>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}