import { ITrademarkDetail, ITrademarkSummary } from "@/interfaces";
import { db } from "@/utils/db";
import { xml2json } from "@/utils/formatters";
import axios, { AxiosRequestConfig } from "axios";
import { Prisma, TrademarkLabel } from ".prisma/client";
import { Label } from "@prisma/client";
import TrademarkLabelGetPayload = Prisma.TrademarkLabelGetPayload;

export interface ITrademarkSearchDto {
  keyword: string;
  offset: number;
  limit: number;
}

let loading = false;

class KiprisService {
  async getTrademarkDetail(applicationNumber: string, all = true) {
    const apiUrl =
      "http://plus.kipris.or.kr/kipo-api/kipi/trademarkInfoSearchService/getBibliographyDetailInfoSearch";

    const params = new URLSearchParams({
      applicationNumber,
    });
    const apiParams = this.buildParamsWithAccessKey(params);

    try {
      loading = true;
      const res = await this.requestApiAndGetJson(apiUrl, apiParams);
      if (!loading) {
        if (res.response?.body?.[0]?.item?.[0]) {
          const item = res.response?.body?.[0]?.item?.[0];
          const { administrativeMeasureInfo } =
            item.administrativeMeasureInfoArray[0];
          const { biblioSummaryInfo } = item.biblioSummaryInfoArray[0];
          const { asignProduct } = item.asignProductArray[0] || {};
          const { agentInfo } = item.agentInfoArray[0];
          const { applicantInfo } = item.applicantInfoArray[0];
          const { sampleImageInfo } = item.sampleImageInfoArray[0];
          const { similarityCodeInfo } = item.similarityCodeInfoArray[0];
          const { vfersionInfo } = item.vfersionInfoArray[0];
          const { viennaCodeInfo } = item.viennaCodeInfoArray[0];
          const { publicationInfo } = item.publicationInfoArray[0];

          let trademarkDetailInfo: ITrademarkDetail = {
            administrativeMeasureInfo,
            biblioSummaryInfo,
            asignProduct,
            agentInfo,
            applicantInfo,
            sampleImageInfo,
            similarityCodeInfo,
            vfersionInfo,
            viennaCodeInfo,
            publicationInfo,
            similarTrademarks: [],
            rejectPdfUrl: "",
          };
          // 비슷한 상표 조회
          if (viennaCodeInfo && all) {
            const apiUrl =
              "http://plus.kipris.or.kr/kipo-api/kipi/trademarkInfoSearchService/getAdvancedSearch";

            const params = new URLSearchParams({
              application: "true",
              registration: "true",
              refused: "false",
              expiration: "false",
              withdrawal: "false",
              publication: "true",
              cancel: "false",
              abandonment: "false",
              trademark: "true",
              serviceMark: "true",
              businessEmblem: "true",
              collectiveMark: "false",
              geoOrgMark: "false",
              trademarkServiceMark: "true",
              certMark: "false",
              geoCertMark: "false",
              internationalMark: "false",
              character: "false",
              figure: "true",
              compositionCharacter: "false",
              figureComposition: "true",
              sound: "false",
              color: "false",
              colorMixed: "false",
              dimension: "false",
              hologram: "false",
              invisible: "false",
              motion: "false",
              visual: "false",
              numOfRows: "6",
              viennaCode: viennaCodeInfo[0].viennaCode[0],
            });
            const apiParams = this.buildParamsWithAccessKey(params);

            const { response } = await this.requestApiAndGetJson(
              apiUrl,
              apiParams
            );

            const items = response.body[0].items[0].item;

            const similarTrademarks = items
              .map(
                ({
                  applicationNumber,
                  applicationStatus,
                  // bigDrawing,
                  drawing,
                }: any) => ({
                  application_number: applicationNumber[0],
                  status: applicationStatus[0],
                  // image_url: bigDrawing[0],
                  image_url: drawing[0],
                })
              )
              .filter((i: any) => i.application_number !== applicationNumber);

            trademarkDetailInfo = {
              ...trademarkDetailInfo,
              similarTrademarks,
            };
          }

          if (biblioSummaryInfo?.[0]?.registerStatus[0]) {
            const status = biblioSummaryInfo[0].registerStatus[0];
            // 거절결정서 조회
            if (status === "거절" && all) {
              const apiUrl =
                "http://plus.kipris.or.kr/openapi/rest/IntermediateDocumentOPService/pdfInfoV2";
              const params = new URLSearchParams({
                applicationNumber,
                accessKey: process.env.NEXT_PUBLIC_KIPRIS_API_KEY as string,
              });
              const { response } = await this.requestApiAndGetJson(
                apiUrl,
                params
              );

              const item = response.body[0].items[0];

              const rejectPdfUrl = item?.pdfInfoV2?.[0]?.filePath[0] ?? "";

              trademarkDetailInfo = {
                ...trademarkDetailInfo,
                rejectPdfUrl,
              };
            } else if (status === "등록" && all) {
              const apiUrl =
                "http://plus.kipris.or.kr/openapi/rest/IntermediateDocumentRGService/pdfInfoV2";
              const params = new URLSearchParams({
                applicationNumber,
                accessKey: process.env.NEXT_PUBLIC_KIPRIS_API_KEY as string,
              });
              try {
                const { response } = await this.requestApiAndGetJson(
                  apiUrl,
                  params
                );

                const items = response.body[0].items[0];

                trademarkDetailInfo.publicationInfo[0].path[0] =
                  items?.pdfInfoV2?.[0]?.filePath?.[0] ?? "";

                trademarkDetailInfo = {
                  ...trademarkDetailInfo,
                };
              } catch (e) {
                console.error(e, "등록결정서를 받아올 수 없습니다");
              }
            }
          }

          try {
            const labels = (await db.trademarkLabel.findMany({
              where: {
                trademark: {
                  applicationNumber: applicationNumber,
                },
              },
              select: {
                label: true,
              },
            })) as { label: Label }[];

            const moods = labels
              .filter((l) => l.label.type === "mood")
              .map((l) => l.label);

            const colors = labels
              .filter((l) => l.label.type === "color")
              .map((l) => l.label);

            return { ...trademarkDetailInfo, moods, colors };
          } catch (e) {
            console.error(e, "label을 처리할 수 없습니다");
          }
        } else {
          console.error("res.response.body[0].item[0] 값이 없습니다:");
        }
      }
    } catch (err) {
      console.error("Failed to get trademark detail:", err);
    }
  }

  async getTrademarkesBySearch({
    keyword,
    offset,
    limit = 30,
  }: ITrademarkSearchDto) {
    const currentPage = Math.floor(offset / limit) + 1;
    const apiUrl =
      "http://plus.kipris.or.kr/openapi/rest/trademarkInfoSearchService/freeSearchInfo";

    console.log("get keyword : ", keyword);

    const params = new URLSearchParams({
      word: keyword,
      accessKey: process.env.NEXT_PUBLIC_KIPRIS_API_KEY as string,
      sortSpec: "AD",
      descSort: "true",
      docsCount: `${limit}`,
      docsStart: `${currentPage}`,
      internationalMark: "false",
    });

    const { response } = await this.requestApiAndGetJson(apiUrl, params);

    // console.log("response : ", response)

    const items = response.body[0].items[0];
    console.log("items : ", items);

    const totalCount = Number(items.TotalSearchCount[0]);

    // {
    //   SerialNumber: [Array],
    //   ApplicationNumber: [Array],
    //   AppReferenceNumber: [Array],
    //   ApplicationDate: [Array],
    //   PublicNumber: [Array],
    //   PublicDate: [Array],
    //   RegistrationPublicNumber: [Array],
    //   RegistrationPublicDate: [Array],
    //   RegistrationNumber: [Array],
    //   RegReferenceNumber: [Array],
    //   RegistrationDate: [Array],
    //   PriorityClaimNumber: [Array],
    //   PriorityClaimDate: [Array],
    //   InternationalRegisterNumber: [Array],
    //   InternationalRegisterDate: [Array],
    //   ApplicationStatus: [Array],
    //   GoodClassificationCode: [Array],
    //   ViennaCode: [Array],
    //   ApplicantName: [Array],
    //   AgentName: [Array],
    //   RegistrationRightholderName: [Array],
    //   Title: [Array],
    //   FulltextExistFlag: [Array],
    //   ImagePath: [Array],
    //   ThumbnailPath: [Array]
    // },
    const trademarks: ITrademarkSummary[] = totalCount
      ? items.TradeMarkInfo.map(
          ({
            ApplicationNumber,
            ApplicationStatus,
            ImagePath,
            SmallImagePath,
            AppReferenceNumber,
            Title,
            ApplicantName,
            AgentName,
          }: any) => ({
            application_number: ApplicationNumber[0],
            application_reference_number: AppReferenceNumber[0],
            image_url: ImagePath[0],
            // small_image_url: SmallImagePath[0],
            status: ApplicationStatus[0],
            title: Title[0],
            applicant_name: ApplicantName[0],
            agent_name: AgentName[0],
          })
        )
      : [];

    return {
      trademarks,
      totalCount,
    };
  }

  private async requestApiAndGetJson(url: string, params: URLSearchParams) {
    try {
      const response = await axios.get(`${url}?${params.toString()}`, {
        responseType: "text",
      });

      const xml = response.data;
      loading = false;
      return await xml2json(xml);
    } catch (error) {
      console.error("Failed to fetch API:", error);
      loading = false;
      throw new Error("API request failed");
    } finally {
      loading = false;
    }
  }

  private buildParamsWithAccessKey(params: URLSearchParams) {
    params.append(
      "ServiceKey",
      process.env.NEXT_PUBLIC_KIPRIS_API_KEY as string
    );
    return params;
  }
}

export const kiprisService = new KiprisService();
