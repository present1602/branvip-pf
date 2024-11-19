import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";

class ProductTypeService {
  async getAllProductTypes() {
    return db.productType.findMany({
      orderBy: {
        code: "asc" as Prisma.SortOrder,
      },
    });
  }
}

export const productTypeService = new ProductTypeService();
