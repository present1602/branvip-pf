import Image from "next/image";

export default function ProgressSection() {

  return (
    <div className="PS w-full">
      <div className="h-[873px] xl:h-[1042px] PS_bg">
        <div className="xl:py-[70px] pt-[70px] pb-[20px] flex justify-center">
        <span className="PS_title">
          복잡한 절차는 줄이고  <span className="xl:hidden"><br /></span>시간을 아끼는<span className="hidden xl:inline"><br /></span> 통합 서비스
        </span>
          {/*이미지*/}

        </div>
        <div className="xl:hidden flex justify-center">
          <div className="flex relative w-[335px] h-[672px]">
            <Image src="/renewal/assets/images/ill/7-1m.png" alt="bg" width={335} height={672} />
            <span className="absolute top-[80px] left-[15px] PS_text">
              STEP 1
            </span>
            <span className="absolute top-[165px] left-[15px] PS_text">
              STEP 2
            </span>
            <span className="absolute top-[250px] left-[15px] PS_text">
              STEP 3
            </span>
            <span className="absolute top-[335px] left-[15px] PS_text">
              STEP 4
            </span>
            <span className="absolute top-[420px] left-[15px] PS_text PS_text--white">
              STEP 5
            </span>
            <span className="absolute top-[488px] left-[15px] PS_text PS_text--gray">
              STEP 6
            </span>
            <span className="absolute top-[538px] left-[15px] PS_text PS_text--gray">
              STEP 7
            </span>
            <span className="absolute top-[590px] left-[15px] PS_text PS_text--gray">
              STEP 8
            </span>
            <span className="absolute top-[640px] left-[15px] PS_text PS_text--gray">
              STEP 9
            </span>

            <div className="absolute top-0 left-[78px] flex flex-col items-center PS_text">
               <span className="mt-4">
              타 서비스
            </span>
              <span className="mt-11 PS_text--thin">
              포털사이트에서
            </span>
              <span>
              무한 검색
            </span>
              <span className="mt-[60px] PS_text--thin">
              디자이너를 찾아서
            </span>
              <span>
              의뢰
            </span>
              <span className="mt-[42px] PS_text--thin">
              디자인 회사
            </span>
              <span className="mt-[23px] mb-[-2px] PS_text--thin">
              변리사 협없없는
            </span>
              <span>
              디자인 작업
            </span>
              <span className="mt-[43px] mb-[-2px] PS_text--thin">
              법적 안정성 낮은
            </span>
              <span>
              디자인 완성
            </span>
              <span className="mt-[40px] PS_text--thin">
              특허청
            </span>
              <span className="mt-[15px] ">
              상표 등록
            </span>
              <span className="mt-[-4px]">
                가능성 낮음
              </span>
              <span className="mt-[48px]">
              재의뢰
            </span>
              <span className="mt-[15px] mb-[-3px]">
              시안
            </span>
              <span>
              완성
            </span>
              <span className="mt-[22px] mb-[-3px] PS_text--thin">
              외부 의로를 통한
            </span>
              <span>
              최종 완성
            </span>
              <span className="mt-[25px] mb-[-3px]">
              특허청
            </span>
              <span>
              출원
            </span>
            </div>

            <div className="absolute w-[100px] top-2 left-[167px] flex flex-col items-center PS_text PS_text--white">
            <span className="mt-[7px] PS_text--green text-[14px]">
              브랜빕
            </span>
              <span className="mt-9 ">
              맞춤형
            </span>
              <span>
                데이터 검색
              </span>
              <span className="mt-[70px] mb-[4px]">
              의뢰
            </span>
              <span className="mt-16 mb-[4px]">
              디자이너 매칭
            </span>
              <span className="PS_text--thin mt-16 ">
                법적 안정성 높은
              </span>
              <span className="">
              디자인 완성
            </span>
              <span className="mt-[67px] mb-[4px]">
              상표출원
            </span>
            </div>

            <span className="PS_text--arrow absolute top-[475px] left-[230px]">
             불필요한 절차와<br/>비용 절감
            </span>

          </div>
        </div>


        <div className="overflow-x-auto w-full xl:flex justify-center relative hidden">
          <div className="min-w-[1519px] relative PS_text">
            <Image src="/renewal/assets/images/ill/7-1.png" alt="bg" width={1519} height={721} />
            <div className="absolute top-[55px] left-[177px] h-[18px] flex justify-center items-center PS_text--step">
                <span>
                  STEP 1
                </span>
              <span className="ml-[140px]">
                  STEP 2
                </span>
              <span className="ml-[140px]">
                  STEP 3
                </span>
              <span className="ml-[140px]">
                  STEP 4
                </span>
              <span className="ml-[138px] PS_text--white">
                  STEP 5
                </span>
              <span className="ml-[100px] PS_text--gray">
                  STEP 6
                </span>
              <span className="ml-[65px] PS_text--gray">
                  STEP 7
                </span>
              <span className="ml-[66px] PS_text--gray">
                  STEP 8
                </span>
              <span className="ml-[65px] PS_text--gray">
                  STEP 9
                </span>
            </div>
            <div className="absolute top-[180px] left-[25px] h-[175px] flex justify-center items-center PS_text--white">
               <span className="PS_text--green">
                  브랜빕
                </span>
              <div className="flex flex-col ml-[80px] gap-[14px]">
                   <span>
                  맞춤형<br/>데이터 검색
                </span>
              </div>
              <div className="flex flex-col ml-[125px] gap-[14px]">
                   <span>
                  의뢰
                </span>
              </div>
              <div className="flex flex-col ml-[125px] gap-[14px]">
                   <span>
                  디자이너 매칭
                </span>
              </div>
              <div className="flex flex-col ml-[80px] gap-1">
                 <span className="PS_text--thin">
                    법적 안정성이 높은
                </span>
                <span>
                  디자인 완성
                </span>
              </div>
              <div className="flex flex-col ml-[90px] mt-[30px] gap-[14px] text-[24px] font-medium">
                   <span>
                  상표출원
                   </span>
              </div>
              <div className="flex flex-col ml-[65px] mt-[40px] gap-[14px] text-[24px] PS_text--arrow">
                   <span>
                  불필요한 절차와 비용 절감
                   </span>
              </div>

            </div>
            <div className="absolute top-[410px] left-[177px] h-[18px] flex justify-center items-center PS_text--step">
                <span>
                  검색
                </span>
              <span className="ml-[340px]">
                  디자인 회사
                </span>
              <span className="ml-[330px]">
                  특허청
                </span>
              <span className="ml-[210px]">
                 다지인 회사
                </span>
            </div>


            <div className="absolute top-[440px] left-[25px] h-[175px] flex justify-center items-center text-[15px]">
              <span>타 서비스</span>
              <div className="flex flex-col ml-[75px]">
                 <span className="PS_text--thin">
                   포털사이트에서
                 </span>
                <span>
                  무한 검색
                </span>
              </div>
              <div className="flex flex-col ml-[95px]">
                 <span className="PS_text--thin">
                   디자이너를 찾아서
                 </span>
                <span>
                  의뢰
                </span>
              </div>
              <div className="flex flex-col ml-[78px] mt-[15px]">
                 <span>
                   변리사 협업없는
                 </span>
                <span className=" text-[18px]">
                  디자인 작업
                </span>
              </div>
              <div className="flex flex-col ml-[95px]">
                 <span className="PS_text--thin">
                   법적 안정성이 낮은
                 </span>
                <span>
                  디자인 완성
                </span>
              </div>
              <div className="flex ml-[93px]">
                <span className="leading-5 text-[19px] font-bold mt-[2px]">
                  상표 등록<br />가능성 낮음
                </span>
              </div>
              <div className="flex flex-col ml-[93px] mt-[3px] text-[18px]">
                 <span>
                   재의뢰
                 </span>

              </div>
              <div className="flex flex-col ml-[70px]">
                 <span>
                   시안 <br /> 완성
                 </span>
              </div>
              <div className="flex flex-col ml-[50px]">
                 <span>
                   <span className="font-medium">외부 의뢰를 통한</span><br/>법적 검토
                 </span>
              </div>
              <div className="flex flex-col ml-[55px]">
                 <span>
                   특허청<br />출원
                 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}