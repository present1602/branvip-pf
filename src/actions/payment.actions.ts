"use server";

import { getServerUserOrRedirect } from "@/actions/authAction";
import { userService } from "@/services/user.service";
import { appCardService } from "@/services/appcard.service";

export async function paymentObj(
  amount: number,
  totalVAT: number,
  items: string[]
) {
  const { id } = await getServerUserOrRedirect();
  const user = await userService.getUserProfileOrThrow(id);
  const orderTitle = items.map((item) => item).join(", ");

  return await appCardService.useAxiosPayple({
    amount: amount,
    surtax: totalVAT,
    email: user.email ?? "",
    phoneNumber: user.phoneNumber ?? "",
    title: orderTitle,
    name: user.name ?? "",
  });
}
