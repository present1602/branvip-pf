import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function FourAdvantagesSection() {


  return (
    <div
      className="flex flex-wrap justify-center pt-[48px] pb-[38px] items-center gap-[24px]
        xl:flex-col xl:pt-[100px] xl:pb-[149px] xl:gap-[33px]">
      {/*카드1*/}
      <div className="FAS_card FAS_card_bg1 w-[335px] h-[474px] pt-[24px]
                        xl:pt-0 xl:w-[1280px] xl:h-[608px]">
        <div className="flex flex-col gap-[16px]
          xl:flex-row xl:gap-0">
          {/*타이틀*/}
          <div className="flex flex-col gap-[20px] pl-[24px]
            xl:gap-[40px] xl:pt-[100px] xl:pl-[116px]">
              <span className="FAS_card_title">
            쉽게 찾는 특허청 데이터
              </span>
            <span className="FAS_card_content xl:whitespace-nowrap">
            간편한 검색 필터로 참고할 로고를 쉽게<br className="xl:hidden" /> 발견해 스크랩할 수 있고<span
              className="xl:inline hidden"><br /></span> 등록이 거절된<br className="xl:hidden" /> 상표의 거절이유를 확인할 수 있어요.
              </span>
            <Link href={"/moods"}>
              <Button
                className="flex FAS_card_btn FAS_card_btn_title w-[140px] xl:w-[252px] xl:h-[70px]">
                로고검색 바로가기
                <svg className="xl:hidden" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                     viewBox="0 0 12 12" fill="none">
                  <path
                    d="M4.81297 9.38066L8.19032 6.00283L4.81297 2.625L3.79785 3.64012L6.16104 6.00283L3.79785 8.36554L4.81297 9.38066Z"
                    fill="#0AB173" />
                </svg>
                <svg className="hidden xl:inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10.0615 19.0595L17.1215 11.9985L10.0615 4.9375L7.93945 7.0595L12.8795 11.9985L7.93945 16.9375L10.0615 19.0595Z"
                    fill="#0AB173" />
                </svg>
              </Button>
            </Link>

          </div>
          {/*이미지*/}
          <div className="xl:mt-[203px] xl:ml-[58px]">
            <Image className="xl:hidden" src="/renewal/assets/images/ill/4-1m.png" alt="4-1" width={335}
                   height={253} />
            <Image className="hidden xl:inline" src="/renewal/assets/images/ill/4-1.png" alt="4-1" width={588}
                   height={413} />
          </div>
        </div>
      </div>

      {/*카드2*/}
      <div className="FAS_card FAS_card_bg2 w-[335px] h-[474px] pt-[24px]
          xl:pt-0 xl:w-[1280px] xl:h-[608px]">
        <div className="flex flex-col gap-[16px]
                    xl:flex-row-reverse xl:gap-0 xl:justify-end">
          {/*타이틀*/}
          <div className="flex flex-col gap-[20px] pl-[24px]
            xl:gap-[43px] xl:pt-[100px] xl:pl-[57px] xl:w-[640px]">
          <span className="FAS_card_title">
            상표등록 가능성이 높은<br /> 로고 디자인
          </span>
            <span className="FAS_card_content">
            브랜빕의 다양한 풀에서 선별된 디자이너와<br /> 상표등록 가능성이 검토된 안전한 디자인<br className="xl:hidden" /> 시안을 제안드려요.
          </span>
            <Link href={'/allinone/check'}>
              <Button
                className="flex FAS_card_btn FAS_card_btn_title w-[274px] xl:w-[476px] xl:h-[70px]">
                로고 디자인 부터 상표 출원까지 한 번에 의뢰하기
                <svg className="xl:hidden" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                     viewBox="0 0 12 12" fill="none">
                  <path
                    d="M4.81297 9.38066L8.19032 6.00283L4.81297 2.625L3.79785 3.64012L6.16104 6.00283L3.79785 8.36554L4.81297 9.38066Z"
                    fill="#0AB173" />
                </svg>
                <svg className="hidden xl:inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10.0615 19.0595L17.1215 11.9985L10.0615 4.9375L7.93945 7.0595L12.8795 11.9985L7.93945 16.9375L10.0615 19.0595Z"
                    fill="#0AB173" />
                </svg>
              </Button>
            </Link>
          </div>
          {/*이미지*/}
          <div className="xl:h-[608px] xl:w-[640px] xl:flex xl:justify-center xl:items-center">
            <div>
              <Image className="xl:hidden" src="/renewal/assets/images/ill/4-2m.png" alt="4-1" width={335}
                     height={253} />
              <Image className="hidden xl:inline" src="/renewal/assets/images/ill/4-2.png" alt="4-1" width={542}
                     height={177} />
            </div>
          </div>
        </div>
      </div>

      {/*카드3*/}
      <div className="FAS_card FAS_card_bg1 w-[335px] h-[474px] pt-[24px]
        xl:pt-0 xl:w-[1280px] xl:h-[608px]">
        <div className="flex flex-col gap-[16px] xl:flex-row">

          {/*타이틀*/}
          <div className="flex flex-col gap-[20px] pl-[24px]
            xl:pl-[120px] xl:pt-[116px] xl:gap-[40px] xl:w-[650px]">
          <span className="FAS_card_title">
            누구나 쉽고 편한 상표 신청
          </span>
            <span className="FAS_card_content">
            AI가 권리확보가 필요한 상품분류를 추천드려요.<br />한눈에 파악하는 내 상표현황과 변리사의 법적<br />검토를 통한 이중 체크로 더욱 안전한 출원 서비스 제공
          </span>
           <Link href={'/contact/init'}>
            <Button
              className="flex FAS_card_btn FAS_card_btn_title w-[162px] xl:w-[290px] xl:h-[70px]">
              올인원 서비스 바로가기
              <svg className="xl:hidden" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                   viewBox="0 0 12 12" fill="none">
                <path
                  d="M4.81297 9.38066L8.19032 6.00283L4.81297 2.625L3.79785 3.64012L6.16104 6.00283L3.79785 8.36554L4.81297 9.38066Z"
                  fill="#0AB173" />
              </svg>
              <svg className="hidden xl:inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24" fill="none">
                <path
                  d="M10.0615 19.0595L17.1215 11.9985L10.0615 4.9375L7.93945 7.0595L12.8795 11.9985L7.93945 16.9375L10.0615 19.0595Z"
                  fill="#0AB173" />
              </svg>
            </Button>
           </Link>

          </div>
          {/*이미지*/}
          <div className="xl:flex xl:justify-center xl:items-center xl:w-[650px] xl:h-[607px]">
            <Image className="xl:hidden" src="/renewal/assets/images/ill/4-3m.png" alt="4-1" width={335} height={253} />
            <Image className="xl:inline hidden" src="/renewal/assets/images/ill/4-3.png" alt="4-1" width={444}
                   height={334} />
          </div>
        </div>
      </div>


      {/*카드4*/}
      <div className="FAS_card FAS_card_bg4 w-[335px] h-[474px] pt-[24px]
        xl:pt-0 xl:w-[1280px] xl:h-[608px]">

        <div className="flex flex-col gap-[16px] xl:flex-row-reverse">
          {/*타이틀*/}
          <div className="flex flex-col gap-[20px] xl:gap-[40px] pl-[24px] xl:w-[640px] xl:pl-[0px] xl:pt-[146px]">
          <span className="FAS_card_title">
            AI와 조화로운 협업을 통한<br /> 시간 절약과 효율성 극대화 (Beta)
          </span>
            <span className="FAS_card_content2 xl:hidden">
            나의 머릿속에서 꺼낸 듯한 로고 AI 레퍼런스 생성<br /> 어려운 출원 절차를 쉽게 완료할 수 있는 출원 의뢰 시스템<br /> 로고 스타일에 딱 맞는 디자이너를 매칭시켜주는 알고리즘
          </span>
            <span className="FAS_card_content xl:inline hidden">
            나의 머릿속에서 꺼낸 듯한 로고 AI 레퍼런스 생성<br /> 어려운 출원 절차를 쉽게 완료할 수 있는 출원 의뢰 시스템<br /> 로고 스타일에 딱 맞는 디자이너를 매칭시켜주는 알고리즘
          </span>
          </div>
          {/*이미지*/}
          <div className="xl:w-[640px] xl:h-[608px] xl:flex xl:justify-center xl:items-center">
            <Image className="xl:hidden" src="/renewal/assets/images/ill/4-4m.png" alt="4-1" width={335} height={253} />
            <Image className="xl:inline hidden" src="/renewal/assets/images/ill/4-4.png" alt="4-1" width={462}
                   height={338} />
          </div>
        </div>
      </div>
    </div>

  );

}