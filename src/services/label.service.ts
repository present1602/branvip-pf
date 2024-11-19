import { db } from "@/utils/db";
import { Prisma } from "@prisma/client";

class LabelService {
  async getAllMoods() {
    const moods = await db.label.findMany({
      where: {
        type: "mood",
        NOT: {
          title: "기타",
        },
      },
      orderBy: {
        title: "asc" as Prisma.SortOrder,
      },
    });

    return moods;
  }

  async getAllColors() {
    const colors = await db.label.findMany({
      where: {
        type: "color",
      },
      orderBy: {
        id: "asc" as Prisma.SortOrder,
      },
    });

    return colors;
  }
}

export const labelService = new LabelService();
