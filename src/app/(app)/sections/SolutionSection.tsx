import Image from "next/image";

const data = [
  {
    img: "/renewal/assets/images/ill/3-1.png",
    title: "아이디어 검색",
    content: "150만개 이상의 특허청 로고 데이터로<br/> 원하는 레퍼런스를 발견해 보세요",
  }, {
    img: "/renewal/assets/images/ill/3-2.png",
    title: "전문적이고 안전한 디자인",
    content: "전문 디자이너와 변리사가 협업하여<br/>디자인의 위험요소를 검토합니다",
  }, {
    img: "/renewal/assets/images/ill/3-3.png",
    title: "바로 진행되는 상표출원",
    content: "내 디자인이 최종 확정되면<br/>안전하게 상표등록을 특허청에 신청합니다",
  },
];
export default function SolutionSection() {
  return (
    <div className="SS  w-full">
      {/*틀*/}
      <div className="SS_bg h-[1460px] xl:h-[1156px] flex flex-col gap-[35px] xl:gap-[70px] pt-[40px] xl:pt-[120px] items-center">

        {/*타이틀*/}
        <span className="SS_title">
         디자인 시작부터,<br className="xl:hidden" /> 디자인을 넘어 상표법 영역까지<br /> 브랜빕에서 해결하세요
       </span>
        <div className="flex flex-col xl:flex-row gap-[40px]">

          {data.map((response, index) => (
            <div key={index}
                 className="SS_card bg-white p-[40px] xl:p-0 xl:pt-[70px] flex flex-col  gap-[32px] xl:gap-[60px] w-[335px] h-[377px] xl:w-[400px] xl:h-[636px] items-center">
              <div className="p-[20px] w-[160px] h-[160px] xl:p-[10px] xl:w-[260px] xl:h-[260px] xl:flex xl:justify-center xl:items-center">
                <Image src={response.img} alt={response.title} width={220} height={220} />
              </div>
              <div className="flex flex-col gap-[21px] xl:gap-[30px]">
             <span className="SS_card_title">
                {response.title}
             </span>
                <span className="SS_card_text" dangerouslySetInnerHTML={{ __html: response.content }}>

             </span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}