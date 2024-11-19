import { db } from "@/utils/db";

class ProductService {
  async getAllProducts() {
    return db.productSelect.findMany({
      include: {
        products: true,
      },
    });
  }

  async getAllProductsItems() {
    return db.productItem.findMany();
  }
}
export const productService = new ProductService();
