import { NextApiRequest, NextApiResponse } from "next";
import { xml2json } from "@/utils/formatters";

export interface ITrademarksSearch{
  keyword: string;
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const keyword = req.body;

  const apiUrl = "http://plus.kipris.or.kr/openapi/rest/trademarkInfoSearchService/trademarkNameMatchSearchInfo";
  const params = new URLSearchParams({
    trademarkNameMatch: keyword,  // 완전검색
    accessKey: process.env.NEXT_PUBLIC_KIPRIS_API_KEY as string, // 키프리스키
    sortSpec: "AD",   // 출원일자
    descSort: "true",   // 내림차순 정렬
    docsCount: '10',  // 페이지당 건수
  });


  try {
    const response = await fetch(`${apiUrl}?${params}`);
    const xml = await response.text();

    const json = await xml2json(xml);  // XML 응답을 JSON으로 변환
    // 성공적으로 응답을 받았다면, JSON 데이터를 클라이언트에 보냄
    res.status(200).json(json);
  } catch (error) {
    // 에러 처리: 요청 실패 시 에러 메시지 반환
    console.error('Error fetching trademark data:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch trademark data' });
  }
};


export default POST;