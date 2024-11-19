"use client";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import useReviewCardIndex from "@/hooks/cardIndex.store";
import { useEffect } from "react";
import DotPagination from "@/components/v3/components/Dotpagination";

const RS_data = [
  {
    title: ["1진행 과정과 일정을 상세히 공유해 주시는 세심함<br/>이 너무 좋았습니다.", "1진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무 좋았습니다."],
    content: ["진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무<br/>좋았습니다. 속도면이나 서비스 처리 등 모두 만족스럽습<br/>니다. 로고의 컬러나 디자인 모두 만족스러워서 고를 수가<br/> 없었어요. 너무 만족합니다.",
      "진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무좋았습니다.<br/> 속도면이나 서비스 처리 등 모두 만족스럽습니다.<br/> 로고의 컬러나 디자인 모두 만족스러워서 고를 수가 없었어요. 너무 만족합니다."],
    name: "똘이장군 돼지부속 인터뷰",
    image: "/renewal/assets/images/ill/5-1.png",
  }, {
    title: ["2진행 과정과 일정을 상세히 공유해 주시는 세심함<br/>이 너무 좋았습니다.", "2진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무 좋았습니다."],
    content: ["진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무<br/>좋았습니다. 속도면이나 서비스 처리 등 모두 만족스럽습<br/>니다. 로고의 컬러나 디자인 모두 만족스러워서 고를 수가<br/> 없었어요. 너무 만족합니다.",
      "진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무좋았습니다.<br/> 속도면이나 서비스 처리 등 모두 만족스럽습니다.<br/> 로고의 컬러나 디자인 모두 만족스러워서 고를 수가 없었어요. 너무 만족합니다."],
    name: "똘이장군 돼지부속 인터뷰",
    image: "/renewal/assets/images/ill/5-1.png",
  }, {
    title: ["3진행 과정과 일정을 상세히 공유해 주시는 세심함<br/>이 너무 좋았습니다.", "3진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무 좋았습니다."],
    content: ["진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무<br/>좋았습니다. 속도면이나 서비스 처리 등 모두 만족스럽습<br/>니다. 로고의 컬러나 디자인 모두 만족스러워서 고를 수가<br/> 없었어요. 너무 만족합니다.",
      "진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무좋았습니다.<br/> 속도면이나 서비스 처리 등 모두 만족스럽습니다.<br/> 로고의 컬러나 디자인 모두 만족스러워서 고를 수가 없었어요. 너무 만족합니다."],
    name: "똘이장군 돼지부속 인터뷰",
    image: "/renewal/assets/images/ill/5-1.png",
  }, {
    title: ["4진행 과정과 일정을 상세히 공유해 주시는 세심함<br/>이 너무 좋았습니다.", "4진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무 좋았습니다."],
    content: ["진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무<br/>좋았습니다. 속도면이나 서비스 처리 등 모두 만족스럽습<br/>니다. 로고의 컬러나 디자인 모두 만족스러워서 고를 수가<br/> 없었어요. 너무 만족합니다.",
      "진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무좋았습니다.<br/> 속도면이나 서비스 처리 등 모두 만족스럽습니다.<br/> 로고의 컬러나 디자인 모두 만족스러워서 고를 수가 없었어요. 너무 만족합니다."],
    name: "똘이장군 돼지부속 인터뷰",
    image: "/renewal/assets/images/ill/5-1.png",
  }, {
    title: ["5진행 과정과 일정을 상세히 공유해 주시는 세심함<br/>이 너무 좋았습니다.", "5진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무 좋았습니다."],
    content: ["진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무<br/>좋았습니다. 속도면이나 서비스 처리 등 모두 만족스럽습<br/>니다. 로고의 컬러나 디자인 모두 만족스러워서 고를 수가<br/> 없었어요. 너무 만족합니다.",
      "진행 과정과 일정을 상세히 공유해 주시는 세심함이 너무좋았습니다.<br/> 속도면이나 서비스 처리 등 모두 만족스럽습니다.<br/> 로고의 컬러나 디자인 모두 만족스러워서 고를 수가 없었어요. 너무 만족합니다."],
    name: "똘이장군 돼지부속 인터뷰",
    image: "/renewal/assets/images/ill/5-1.png",
  },
];


export default function ReviewSection() {

  const { offset, setOffset } = useReviewCardIndex();

  const handleLeftClick = () => {
    if (offset === 0) {
      setOffset(RS_data.length - 1);
    } else {
      setOffset((offset - 1) % RS_data.length);
    }
  };
  const handleRightClick = () => {
    setOffset((offset + 1) % RS_data.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleRightClick(); // 5초마다 오른쪽 버튼 클릭 이벤트 실행
    }, 5000); // 5000ms = 5초

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]); // offset이 변경될 때마다 useEffect가 다시 실행됩니다.


  return (
    // 배경
    <div className="w-full">
        <div className="flex flex-col items-center pt-[30px] xl:pt-[60px]  RS_bg h-[533px] xl:h-[781px]">
          {/*제목*/}
          <div className="inline-flex flex-col items-center gap-[6px] xl:gap-[10px] mb-[32px] xl:mb-[52px]">
            <span className="RS_subtitle">
              후기로 보는 브랜빕
            </span>
            <span className="RS_title">
              브랜빕 후기
            </span>
          </div>

          {/*카드*/}
          <div className="flex items-center gap-[53px]">
            <div className="hidden xl:inline">
              <Button className="rounded-full bg-custom_color-50  w-[82px] h-[82px]" isIconOnly
                      onClick={handleLeftClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
                  <g filter="url(#filter0_d_815_19683)">
                    <circle cx="45" cy="45" r="41" transform="rotate(-180 45 45)" fill="white" />
                    <circle cx="45" cy="45" r="40.5" transform="rotate(-180 45 45)" stroke="#E9E9E9" />
                  </g>
                  <path d="M50 56L39 45L51 33" stroke="black" strokeWidth="3" strokeLinecap="square" />
                  <defs>
                    <filter id="filter0_d_815_19683" x="0" y="0" width="90" height="90" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                     result="hardAlpha" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_815_19683" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_815_19683" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </Button>
            </div>
            <div className="RS_card flex w-[336px] xl:w-[1280px] xl:h-[403px] p-[20px] xl:p-[75px] items-start xl:justify-between gap-[10px] xl:gap-[145px]">
              <div className=" gap-[20px] xl:gap-[47px] flex flex-col flex-shrink-0">
              <span className="RS_card_title xl:hidden"
                    dangerouslySetInnerHTML={{ __html: RS_data[offset].title[0] }} />
                <span className="RS_card_title hidden xl:inline">
            {RS_data[offset].title[1]}
          </span>
                <span className="RS_card_content xl:hidden"
                      dangerouslySetInnerHTML={{ __html: RS_data[offset].content[0] }} />
                <span className="RS_card_content hidden xl:inline"
                      dangerouslySetInnerHTML={{ __html: RS_data[offset].content[1] }} />
                <span className="RS_card_name">
              {RS_data[offset].name}
            </span>
                <Image className="RS_card_image xl:hidden" alt={RS_data[offset].title[1]} src={RS_data[offset].image}
                       width={50}
                       height={50} />
              </div>
              <Image className="RS_card_image hidden xl:inline" alt={RS_data[offset].title[1]}
                     src={RS_data[offset].image}
                     width={253}
                     height={253} />
            </div>

            <div className="hidden xl:inline w-[82px] h-[82px]">
              <Button className="rounded-full bg-custom_color-50 w-[82px] h-[82px]" isIconOnly
                      onClick={handleRightClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
                  <g filter="url(#filter0_d_815_19695)">
                    <circle cx="45" cy="45" r="41" fill="white" />
                    <circle cx="45" cy="45" r="40.5" stroke="#E9E9E9" />
                  </g>
                  <path d="M40 34L51 45L39 57" stroke="black" strokeWidth="3" strokeLinecap="square" />
                  <defs>
                    <filter id="filter0_d_815_19695" x="0" y="0" width="90" height="90" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                     result="hardAlpha" />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_815_19695" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_815_19695" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </Button>
            </div>
          </div>

          {/*페이지네이션*/}
          <div className="mt-[24px] mb-[47px] xl:mt-[52px] xl:mb-[83px]">
            <DotPagination total={5} activeIndex={2} />
          </div>
        </div>
    </div>
  );
}