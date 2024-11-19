"use server";

import { orderService } from "../services/order.service";
import { OrderType, Pricing, Prisma } from "@prisma/client";
import { getServerUserOrRedirect } from "./authAction";
import { userService } from "../services/user.service";
import { paymentMethodService } from "../services/payment-method.service";
import { paypleService } from "../services/payple.service";
import { formatDateTimeString } from "@/utils/formatters";
interface OrderReference {
  applicationNumber: string;
  imageUrl: string;
}

export async function createOrder(
  payload: Prisma.OrderCreateInput,
  items: Pricing[],
  references?: OrderReference[]
) {
  const { id } = await getServerUserOrRedirect();
  const user = await userService.getUserProfileOrThrow(id);
  const card = await paymentMethodService.getMyPaymentMethod(user.id);

  if (!card) {
    throw new Error("결제수단이 등록되어 있지 않습니다.");
  }

  const orderTitle = items.map((item) => item.title).join(", ");

  await paypleService.paymentByBillingKey({
    email: user.email ?? "",
    phoneNumber: user.phoneNumber ?? "",
    amount: payload.finalPaymentPrice,
    title: orderTitle,
    billingKey: card.billingKey,
  });

  const boardId = await orderService.createOrderAndGetBoardId(
    payload,
    items,
    user.id,
    references
  );

  const applicant = await userService.getApplicantsByUserId(user.id);

  if (!applicant) {
    return "gotoApplicant";
  }

  return boardId;
}


export async function getOrderByUserAndType(type?: OrderType) {
  const { id: userId } = await getServerUserOrRedirect()
  let orders;
  if (!type) {
    orders = await orderService.getOrderByUserAndType(userId)
  } else {
    orders = await orderService.getOrderByUserAndType(userId, type)
  }

  return orders
}