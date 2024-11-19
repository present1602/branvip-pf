"use server";

import { getServerUserOrRedirect } from "@/actions/authAction";
import { userService } from "@/services/user.service";
import { appCardService } from "@/services/appcard.service";
import { Pricing, Prisma } from "@prisma/client";

export async function createObj(
  payload: Prisma.OrderCreateInput,
  items: Pricing[],
  totalVAT: number,
) {
  const { id } = await getServerUserOrRedirect();
  const user = await userService.getUserProfileOrThrow(id);
  const orderTitle = items.map((item) => item.title).join(", ");


  return await appCardService.useAxiosPayple({
    amount: payload.finalPaymentPrice,
    surtax: totalVAT,
    email: user.email ?? "",
    phoneNumber: user.phoneNumber ?? "",
    title: orderTitle,
    name: user.name ?? "",
  });

}