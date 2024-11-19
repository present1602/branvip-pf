import { db } from "@/utils/db";
import { PricingType, Prisma } from "@prisma/client";

class PricingService {
  async getAllPricing() {
    const pricing = await db.pricing.findMany({
      orderBy: {
        order: Prisma.SortOrder.asc,
      },
    });

    const designPricings = pricing.filter((p) => p.type === "DESIGN");
    const applicationPricings = pricing.filter((p) => p.type === "APPLICATION");
    const applicationWithDesignPricings = pricing.filter(
      (p) => p.type === "APPLICATION_WITH_DESIGN"
    );

    return {
      designPricings,
      applicationPricings,
      applicationWithDesignPricings,
    };
  }

  async getAppPricing() {
    try {
      const prices = await db.priceMeasurement.findMany({
        where: {
          type: PricingType.APPLICATION,
        },
        include: {
          serviceList: {
            orderBy: {
              index: Prisma.SortOrder.asc,
            },
          },
        },
      });
      if (prices.length === 0) {
        console.log("No pricing information found for APPLICATION type");
      }

      return prices;
    } catch (error) {
      console.error("Error fetching application pricing:", error);
      throw error; // 또는 적절한 오류 처리
    }
  }

  async getDesignPricing() {
    const price = await db.priceMeasurement.findMany({
      where: {
        type: PricingType.DESIGN,
      },
      include: {
        serviceList: {
          orderBy: {
            index: Prisma.SortOrder.asc,
          },
        },
      },
    });
    return price;
  }
}

export const pricingService = new PricingService();
