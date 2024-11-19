import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const AllInOnePage: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center xl:mb-[92px] xl:mt-[190px]">
        <span className="heading2 xl:title1 mb-[39px] mt-[60px] xl:mb-[58px] xl:mt-0">
          의뢰하실 서비스를 선택 해주세요.
        </span>
        <div className="heading2 flex flex-col gap-[29px] text-gray_scale-500 xl:flex-row">
          <Link href={"/allinone/check"}>
            <div className="flex h-[313px] w-[317px] flex-col justify-between rounded-[18px] border border-gray_scale-90 p-[30px] hover:border-[3px] hover:border-primary_scale-100">
              <span className="self-start">
                상표 출원 <br className="hidden xl:inline" />
                의뢰하러 가기
              </span>
              <Image
                className="self-end"
                src={"/renewal/assets/images/ill/allinone-01.png"}
                alt={"1"}
                width={67}
                height={81}
              />
            </div>
          </Link>
          <Link href={"/req/init/all/application"}>
            <div className="flex h-[313px] w-[317px] flex-col justify-between rounded-[18px]  border border-gray_scale-90 p-[29px] hover:border-[3px] hover:border-primary_scale-100">
              <span className="self-start">
                올인원 서비스 (출원+로고디자인) 의뢰 하러 가기
              </span>
              <Image
                className="self-end"
                src={"/renewal/assets/images/ill/allinone-02.png"}
                alt={"1"}
                width={94}
                height={88}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default AllInOnePage;
