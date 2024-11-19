import { PaypleResponse } from "../interfaces/payple.interface";
import { db } from "../utils/db";

class PaymentMethodService {
  async createPaymentMethod(userId: string, paypleData: PaypleResponse) {
    await db.userPaymentMethod.deleteMany({
      where: {
        userId,
      },
    });

    const paymentMethod = await db.userPaymentMethod.create({
      data: {
        userId,
        billingKey: paypleData.PCD_PAYER_ID,
        cardName: paypleData.PCD_PAY_CARDNAME || "",
        cardNumber: paypleData.PCD_PAY_CARDNUM || "",
      },
    });

    return paymentMethod;
  }

  async getMyPaymentMethod(userId: string) {
    const paymentMethod = await db.userPaymentMethod.findFirst({
      where: {
        userId,
      },
    });

    return paymentMethod;
  }
}

export const paymentMethodService = new PaymentMethodService();
