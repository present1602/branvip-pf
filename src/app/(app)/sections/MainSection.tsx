import {Button} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function MainSection() {
  return (
    <div className="MS w-full">
      <div className="MS_bg relative z-10 flex h-[448px] flex-col items-center justify-between xl:hidden">
        <div className="absolute top-0 z-20 xl:hidden">
          <Image
            src={"/renewal/assets/images/ill/1-1.png"}
            alt={"test2"}
            width={375}
            height={448}
          />
        </div>
        <div className="z-30 flex flex-col items-center gap-[18px] pt-[81px]">
          <span className="MS_title">
            로고 디자인과
            <br />
            상표등록을 한 번에
          </span>
          <Link href={"/allinone/check"}>
            <Button className="MS_btn w-[114px]">
              <span className="MS_btn_text"> 의뢰하기</span>
            </Button>
          </Link>
        </div>
        <div className="z-30">
          <Image
            src={"/renewal/assets/images/ill/2.png"}
            alt={"test"}
            width={281}
            height={185}
            style={{ width: "281px", height: "auto" }} // 또는 height: '185px', width: 'auto'
          />
        </div>
      </div>
      <div className="relative hidden h-[941px] w-full bg-[url('/renewal/assets/images/ill/1-1-1200px.png')] bg-cover bg-center bg-no-repeat xl:flex">
        <div className="absolute inset-0 flex justify-center ">
          <div className="z-30 mt-[163px] flex flex-col items-center">
            <span className="MS_title">로고 디자인과 상표등록을 한 번에</span>
            <Link href={"/allinone/check"}>
              <Button className="MS_btn mb-[23px] mt-[80px] h-[63px] w-[185px]">
                <span className="MS_btn_text"> 의뢰하기</span>
              </Button>
            </Link>
            <Image
              src={"/renewal/assets/images/ill/2.png"}
              alt={"test"}
              width={983}
              height={647}
              style={{ width: "983px", height: "auto" }} // 또는 height: '185px', width: 'auto'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
