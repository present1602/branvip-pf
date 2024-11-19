"use server";

import { PaypleResponse } from "../interfaces/payple.interface";
import { getServerUserOrRedirect } from "./authAction";
import { paymentMethodService } from "../services/payment-method.service";

export async function registCard(paypleResponse: PaypleResponse) {
  const user = await getServerUserOrRedirect();

  await paymentMethodService.createPaymentMethod(user.id, paypleResponse);

  return true;
}

export async function isRegistedMyCard() {
  const user = await getServerUserOrRedirect();

  const card = await paymentMethodService.getMyPaymentMethod(user.id);

  if (card) {
    return true;
  }

  return false;
}
