import { Prisma } from "@prisma/client";
import { db } from "@/utils/db";

class InquiryService {
  async createInquiry(dto: Prisma.InquiryCreateInput) {
    try {
      return await db.inquiry.create({
        data: dto,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getInquires() {
    return db.inquiry.findMany({
      orderBy: {
        id: "desc" as Prisma.SortOrder,
      },
    });
  }
}

export const inquiryService = new InquiryService();
