import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";
import SortOrder = Prisma.SortOrder;

class ViennaServiceV2 {
  async getAllViennaCodes(parentCode: string[]) {
    return db.viennaCode.findMany({
      where: {
        parentCode: { in: parentCode },
      },
      orderBy: {
        code: "asc" as Prisma.SortOrder,
      },
    });
  }

  async getAllViennaCodes_v2() {
    return db.viennaCode.findMany({
      orderBy: {
        code: "asc" as Prisma.SortOrder,
      },
    });
  }
}

export const viennaServiceV2 = new ViennaServiceV2();
