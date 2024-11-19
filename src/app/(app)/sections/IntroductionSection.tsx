const data = [
  {
    name: "조윤정 대표",
    job: "변리사",
    status: "경력",
    now: "변리사 경력 10+",
    record: "산업디자인, 생활디자인 전공<br />(전) LG생활건강 변리사<br /> 한국디자인진흥원, 중소벤처기업진흥공단,<br class='xl:inline hidden' /> 강원지식재산센터 등 강의",
  }, {
    name: "강동운",
    job: "협력 변리사",
    status: "경력",
    now: "변리사 경력 10+",
    record: "기업기술가치평가사<br />팁스(TIPS) 연구개발과제평가단 평가위원",
  }, {
    name: "김형규",
    job: "협력 변리사",
    status: "경력",
    now: "변리사 경력 10+",
    record: "IRIS 평가위원<br/> 의료기기 분야 전문 변리사",
  }, {
    name: "이상욱",
    job: "협력 변리사",
    status: "경력",
    now: "변리사 경력 10+",
    record: "기업기술가치평가사<br/>이학박사",
  },{
    name: "이정림",
    job: "협력 변리사",
    status: "경력",
    now: "변리사 경력 10+",
    record: "기업기술가치평가사<br/>팁스(TIPS) 연구개발과제평가단 평가위원",
  },
];

export default function IntroductionSection() {
  return (
    //배경
    <div className="h-[536px] xl:h-[998px] w-full IS">
      {/*틀*/}
      <div className="flex flex-col xl:flex-row gap-[50px] xl:gap-[66px] pt-[47px] pl-[20px] xl:pt-[231px] xl:pl-[320px]">
        {/*타이틀*/}
        <div>
            <span className="IS_title whitespace-nowrap">
              브랜빕의<br />전문가를 소개<br />합니다
            </span>
        </div>
        {/*카드*/}
        <div className="flex gap-[12px] xl:gap-[35px] xl:h-[600px] overflow-x-scroll">
          {data.map((index, key) => (
            <div className="IS_card xl:w-[359px] xl:h-[492px]" key={key}>
              <div className="flex flex-col gap-[22px] pt-[53px] pl-[21px] xl:pt-[88px] xl:pl-[36px] xl:gap-[36px]">
                <div className="flex IS_card_title gap-[9px] xl:items-center ">
                  <span>
                    {index.name}
                  </span>
                  <svg className="xl:hidden" xmlns="http://www.w3.org/2000/svg" width="2" height="17" viewBox="0 0 2 17" fill="none">
                    <path d="M1.0918 1L1.0918 16" stroke="#C6C6C6" strokeWidth="0.6061" strokeLinecap="square" />
                  </svg>
                  <svg className="hidden xl:inline" xmlns="http://www.w3.org/2000/svg" width="2" height="26" viewBox="0 0 2 26" fill="none">
                    <path d="M1 1L1 25" stroke="#C6C6C6" strokeLinecap="square" />
                  </svg>
                  <span>
                  {index.job}
                  </span>
                </div>
                <div className="flex flex-col gap-[10px] xl:gap-[16px] ">
                  <div className="flex gap-[10px] xl:gap-[17px]">
                    <div className="IS_card_circle xl:w-[80px] xl:h-[48px]">
                      <span className="IS_card_circle_title">
                        {index.status}
                      </span>
                    </div>
                    <div className="flex justify-center items-center">
                    <span className="IS_card_subtitle">
                    {index.now}
                  </span>
                    </div>

                  </div>
                  <div>
                    <span className="IS_card_content" dangerouslySetInnerHTML={{__html:index.record}}>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>

  );
}