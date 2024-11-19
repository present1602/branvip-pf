import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";

class ViennaService {
  async getAllViennaCodes() {
    return db.viennaCode.findMany({
      where: {
        parentCode: null,
      },
      orderBy: {
        code: "asc",
      },
    });
  }

  async getAllViennaCodes_v2() {
    return db.viennaCode.findMany({
      orderBy: {
        code: "asc",
      },
    });
  }
}

export const viennaService = new ViennaService();
