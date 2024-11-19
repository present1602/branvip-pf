import { ITrademarkCard } from "@/interfaces";
import { db } from "@/utils/db";
import { Prisma, Trademark } from "@prisma/client";

export interface ITrademarkFilter {
  offset: number;
  limit: number;

  mood_id?: number;
  color_id?: number;
  product_type_code?: string;

  vienna_code?: string;
  status?: string;
}

class TrademarkService {
  async getFilteredTrademarks(props: ITrademarkFilter) {
    const {
      offset,
      limit,
      mood_id,
      color_id,
      product_type_code,
      vienna_code,
      status,
    } = props;

    let trademarks: ITrademarkCard[] = [];
    let totalCount = 0;
    let grandchildViennaCodes: string[] = [];

    if (vienna_code) {
      const childVienna = await db.viennaCode.findFirst({
        where: {
          parentCode: vienna_code,
        },
        select: {
          code: true,
        },
      });

      if (childVienna?.code) {
        const grandchildViennas = await db.viennaCode.findMany({
          where: {
            parentCode: childVienna.code,
          },
          select: {
            code: true,
          },
        });

        grandchildViennaCodes = grandchildViennas.map((i) => i.code);
      }
    }

    const where: Prisma.TrademarkWhereInput = {
      AND: [
        {
          applicationNumber: {
            not: null,
          },
          typeCode: {
            startsWith: "도형",
          },
        },
        { isConnectedKipris: true },
        mood_id
          ? {
              trademarkLabel: {
                some: {
                  labelId: mood_id,
                },
              },
            }
          : {},
        color_id
          ? {
              trademarkLabel: {
                some: {
                  labelId: color_id,
                },
              },
            }
          : {},
        product_type_code
          ? {
              trademarkProductType: {
                some: {
                  productTypeCode: product_type_code,
                },
              },
            }
          : {},
        vienna_code
          ? {
              trademarkViennaCode: {
                some: {
                  viennaCode: {
                    in: grandchildViennaCodes,
                  },
                },
              },
            }
          : {},
        status
          ? status.includes("결정")
            ? {
                lastDisposalCodeName: {
                  in: [
                    `${status}(일반)`,
                    `이의신청후 ${status}`,
                    `${status}(취소환송후)`,
                  ],
                },
              }
            : status === "공고"
            ? {
                lastDisposalCodeName: {
                  equals: " ",
                },
              }
            : status === "등록"
            ? {
                lastDisposalCodeName: {
                  equals: "등록",
                },
              }
            : status === "거절"
            ? {
                lastDisposalCodeName: {
                  equals: "거절",
                },
              }
            : status === "기타"
            ? {
                lastDisposalCodeName: {
                  in: [
                    "포기(등록결정전 포기서제출)",
                    "포기(등록결정후 포기서제출)",
                    "포기(등록료 미납)",
                    "취하(등록결정후 취하서제출)",
                    "취하(등록결정전 취하서제출)",
                    "취하(변경 원출원)",
                  ],
                },
              }
            : status === "출원"
            ? {
                lastDisposalCodeName: {
                  startsWith: "출원",
                },
              }
            : {}
          : {},
      ],
    };

    const select: Prisma.TrademarkSelect = {
      id: true,
      trademarkName: true,
      trademarkNameNameEn: true,
      applicationNumber: true,
      thumbnailUrl: true,
      imageUrl: true, // 로고 검색 페이지 이미지 노출을 썸네일 이미지에서 기본 이미지로 변경
      lastDisposalCodeName: true,
      trademarkProductType: {
        select: {
          productType: {
            select: {
              code: true,
              title: true,
            },
          },
        },
      },
      trademarkLabel: {
        select: {
          label: {
            select: {
              imageUrl: true,
              title: true,
              id: true,
            },
          },
        },
        where: {
          label: {
            type: "mood",
          },
        },
      },
    };

    const trademarkData: any[] = await db.trademark.findMany({
      select,
      where,
      skip: offset,
      take: limit,
      orderBy: { id: "desc" as Prisma.SortOrder },
    });

    if (!trademarkData) {
      return {
        trademarks: [],
        totalCount,
      };
    }

    trademarks = trademarkData.map((tr) => ({
      id: tr.id,
      application_number: tr.applicationNumber,
      trademark_name: tr.trademarkName,
      trademark_name_name_en: tr.trademarkNameNameEn,
      // trademark_product_type: tr.trademark_product_type,
      thumbnail_url: tr.thumbnailUrl,
      image_url: tr.imageUrl,
      status: tr.lastDisposalCodeName,
      labels: tr.trademarkLabel,
    }));

    totalCount = await db.trademark.count({
      where,
    });

    return {
      trademarks,
      totalCount,
    };
  }

  // 로고 디테일 페이지에서 상태를 가져와서 DB와 비교 후 최신 상태로 유지

  async changeTrademarkStatus(applicationId: string, newStatus: string) {
    try {
      const trademark = await db.trademark.findUnique({
        where: {
          applicationNumber: applicationId,
        },
      });

      if (trademark && trademark.lastDisposalCodeName !== newStatus) {
        const updateResult = await db.trademark.update({
          where: {
            applicationNumber: applicationId,
          },
          data: {
            lastDisposalCodeName: newStatus,
          },
        });
        console.log(
          "[출원번호 :" +
            applicationId +
            "] 의 출원 상태가 업데이트 되었습니다."
        );

        return updateResult;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getMyScrapLogoList(userId: string) {
    try {
      const logoList = await db.logoScrap.findMany({
        where: { userId },
        select: {
          id: true,
          trademarkId: true,
          trademark: {
            select: {
              imageUrl: true,
            },
          },
        },
      });
      return logoList;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export const trademarkService = new TrademarkService();
