import { db } from "@/utils/db";

class LogotypeService {
  async getAllLogotypes() {
    try {
      return db.logoType.findMany();
    } catch (e) {
      console.error(e);
    }
  }

  async getAllLogo() {
    try {
      return db.recommendLogo.findMany();
    } catch (e) {
      console.error(e);
    }
  }
}

export const logotypeService = new LogotypeService();
