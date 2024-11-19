import { ITrademarkSummary } from "@/interfaces";
import { xml2json } from "@/utils/formatters";

export interface ITrademarkSearchDto {
  keyword: string;
  status: string;
  product_type: string;
  vienna_code: string;
  offset: number;
  limit: number;
}

export interface ITrademarkExactSearchDto {
  keyword: string;
  limit: number;
}

class KiprisServiceV2 {

  async getTrademarksBySearch({
                                keyword,
                                status,
                                product_type,
                                vienna_code,
                                offset,
                                limit = 30,
                              }: ITrademarkSearchDto) {
    const currentPage = Math.floor(offset / limit) + 1;
    const apiUrl =
      "http://plus.kipris.or.kr/kipo-api/kipi/trademarkInfoSearchService/getAdvancedSearch";


    const params = new URLSearchParams({
      freeSearch: keyword,  //자유검색
      ServiceKey: process.env.NEXT_PUBLIC_KIPRIS_API_KEY as string, // 키프리스키
      sortSpec: "AD",   //  출월일자
      descSort: "true",   //  desc 방식
      numOfRows: `${limit}`,  // 페이지당 건수
      pageNo: `${currentPage}`,   // 페이지 넘버
      internationalMark: "false",   // 국제등록 상표 검색안함

      // 로고 상태
      application: "true",    //  출원
      registration: "true",   //등록
      refused: "true",    //거절
      expiration: "true", //소멸
      withdrawal: "true",   //취하
      publication: "true",  //공고
      cancel: "true",   // 무효
      abandonment: "true",    //포기

      // 로고 모양
      character: "true",    //문자상표
      figure: "true",    //도형상표
      compositionCharacter: "true",    //복합문자
      figureComposition: "true",    //도형복합
      sound: "true",    //소리상표
      fragrance: "true",    //냄새상표
      color: "true",    //색채상표
      dimension: "true",    //입체상표
      colorMixed: "true",    //색채복합
      hologram: "true",    //홀로그램
      motion: "true",    //동작상표
      visual: "true",    //기타시각적으로인식가능
      invisible: "true",    //기타시각적으로인식불가능
      // 상표
      trademark: "true", // 상표
    });
    if (status === '전체'){
      status = ''
    }
    if (status !== "") {
      const newStatus =
        status === "출원" ? "application" :
          status === "공고" ? "publication" :
            status === "등록" ? "registration" :
              status === "거절" ? "refused" :
                status === "기타" ? "another" : "";
      if (status !== null) {
        params.set("application", "false");  // 출원
        params.set("publication", "false");  //공고
        params.set("registration", "false"); // 등록
        params.set("refused", "false");  // 거절
        params.set("expiration", "false"); // 소멸
        params.set("withdrawal", "false"); // 취하
        params.set("cancel", "false"); // 무효
        params.set("abandonment", "false"); // 포기
        params.set(newStatus, "true");
      }
      if (newStatus === "another") {
        params.set("expiration", "true"); // 소멸
        params.set("withdrawal", "true"); // 취하
        params.set("cancel", "true"); // 무효
        params.set("abandonment", "true"); // 포기
      }
    }

    if(product_type !== ""){
      params.set("classification",product_type)
    }

    if(vienna_code === undefined){
    }else if(vienna_code !== ""){
      if (vienna_code.endsWith("00")) {
        vienna_code = vienna_code.slice(0, -2);
      }
      params.set("viennaCode",vienna_code)
    }


    const { response } = await this.requestApiAndGetJson(apiUrl, params);
    const items = response.body[0].items[0];
    const totalCount = Number(response.count[0].totalCount[0]);

    const trademarks: ITrademarkSummary[] = totalCount
      ? items.item.map(
        ({
           applicationNumber,
           applicationStatus,
           bigDrawing,
           appReferenceNumber,
           title,
           applicantName,
           agentName,
         }: any) => ({
          application_number: applicationNumber[0],
          application_reference_number: appReferenceNumber[0],
          image_url: bigDrawing[0],
          status: applicationStatus[0],
          title: title[0],
          applicant_name: applicantName[0],
          agent_name: agentName[0],
        }),
      )
      : [];



    return {
      trademarks,
      totalCount,
      // similarTrademarks,
    };
  }

  async getTrademarksByExactMatch({
                                    keyword,
                                    limit
                                  }:ITrademarkExactSearchDto){
    const apiUrl =
      "http://plus.kipris.or.kr/openapi/rest/trademarkInfoSearchService/trademarkNameMatchSearchInfo";



    const params = new URLSearchParams({
      trademarkNameMatch: keyword,  // 완전검색
      accessKey: process.env.NEXT_PUBLIC_KIPRIS_API_KEY as string, // 키프리스키
      sortSpec: "AD",   //  출월일자
      descSort: "true",   //  desc 방식
      docsCount: `${limit}`,  // 페이지당 건수
    })

    const { response } = await this.requestApiAndGetJson(apiUrl, params);

    console.log(response)
    return response


  }


  async requestApiAndGetJson(url: string, params: URLSearchParams) {
    // url 확인하고싶을때
    // console.log('요청 api',`${url}?${params.toString()}`)
    const response = await fetch(`${url}?${params.toString()}`);
    const xml = await response.text();
    const json = await xml2json(xml);
    return json;
  }

}

export const kiprisServiceV2 = new KiprisServiceV2();
