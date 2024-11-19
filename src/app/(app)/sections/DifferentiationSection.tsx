import Image from "next/image";

const data = [
  {
    title: "흔히 사용되는 디자인<br />상표등록 X",
    image: "/renewal/assets/images/ill/2-1.png",
  }, {
    title: "다른 상표와 유사한 디자인<br />상표등록 X",
    image: "/renewal/assets/images/ill/2-2.png",
  }, {
    title: "기타 다양한<br/>특허청의 심사기준",
    image: "/renewal/assets/images/ill/2-3.png",
  },
];
const data22 = {
  title: "거절된 상표<br />5년간 20만개+",
  image: "/renewal/assets/images/ill/2-4.png",
};

const data2 = {
  title: "손실 비용<br />수천만 원+",
  content: "상표 거절 대응 100만원+<br/>로고 재디자인 100만원+<br/>간판 재제작 100만원+<br/>제품 포장 재제작 100만원+<br/>홍보물 재제작 100만원+<br/>기타 간접비용 및 기회비용 ...",
  image: "/renewal/assets/images/ill/2-5.png",
};
export default function DifferentiationSection() {
  return (
    <div className="DS_bg h-[1833px] w-full">
      <div>
        <div
          className=" pt-[40px] xl:pt-[120px] flex flex-col pb-[23px] xl:pb-[131px] items-center gap-[28px] xl:gap-[0px]">
        <span className="DS_title xl:mb-[131px]">
          상표등록을 못해서 버려지는 <br /> 수만 개의 디자인
        </span>
          <div className="flex flex-col xl:flex-row xl:flex-wrap xl:justify-center gap-[24px] xl:mb-[40px]">
            {data.map((response, index) => (
              <div key={index}
                   className="DS_card w-[335px] xl:w-[400px] xl:h-[600px] flex flex-col justify-between pt-[30px] pl-[30px] xl:pt-[48px] xl:pl-[48px] pr-[12px] xl:pr-[47px] pb-[12px] xl:pb-[10px]">
            <span className="DS_card_title whitespace-nowrap" dangerouslySetInnerHTML={{ __html: response.title }}>
            </span>
                <div className="flex flex-col items-end ">
                  <div
                    className="w-[180px] h-[180px] xl:w-[310px] xl:h-[310px] p-[20px] flex flex-col justify-between xl:items-end">
                    <div>

                    </div>
                    <Image src={response.image} alt={response.title} width={220} height={220} />
                  </div>
                </div>
              </div>
            ))}

          </div>

          <div className="flex flex-col xl:flex-row xl:flex-wrap xl:justify-center gap-[24px]">

            <div
              className="DS_card w-[335px] xl:w-[400px] xl:h-[600px] flex flex-col justify-between pt-[30px] pl-[30px] xl:pt-[48px] xl:pl-[48px] pr-[12px] xl:pr-[47px] pb-[12px] xl:pb-[10px]">
            <span className="DS_card_title" dangerouslySetInnerHTML={{ __html: data22.title }}>
            </span>
              <div className="flex flex-col items-end ">
                <div
                  className="w-[180px] h-[180px] xl:w-[310px] xl:h-[310px] p-[20px] flex flex-col justify-between xl:items-end">
                  <div>

                  </div>
                  <Image src={data22.image} alt={data22.title} width={220} height={220} />
                </div>
              </div>
            </div>


            <div
              className=" relative DS_card w-[335px] xl:w-[400px] h-[300px] xl:h-[600px] flex flex-col xl:justify-start xl:gap-[29px] pt-[30px] pl-[30px] xl:pt-[48px] xl:pl-[48px] pr-[12px] xl:pr-[47px] pb-[12px] xl:pb-[10px]">
            <span className="DS_card_title" dangerouslySetInnerHTML={{ __html: data2.title }}>
            </span>
              <span className="DS_card_content" dangerouslySetInnerHTML={{ __html: data2.content }}>
            </span>
              <div className="absolute  top-[170px] xl:top-[290px] left-[140px] xl:left-[60px] flex flex-col items-end ">
                <div
                  className="w-[180px] h-[180px] xl:w-[310px] xl:h-[310px] p-[20px] xl:p-[1px] flex flex-col justify-between">
                  <div className="xl:mt-[86px] ">
                    <Image src={data2.image} alt={data2.title} width={300} height={300} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  );

}