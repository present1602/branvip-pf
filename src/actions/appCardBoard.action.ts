"use server";

import { Pricing, Prisma } from "@prisma/client";
import { getServerUserOrRedirect } from "@/actions/authAction";
import { userService } from "@/services/user.service";
import { orderService } from "@/services/order.service";
import { mailingApplication } from "@/pages/api/mailing-application";

interface OrderReference {
  applicationNumber: string;
  imageUrl: string;
}

export async function appCardBoard(
  payload: Prisma.OrderCreateInput,
  items: Pricing[],
  references?: OrderReference[]
) {
  const { id } = await getServerUserOrRedirect();
  const user = await userService.getUserProfileOrThrow(id);
  console.log("user", user);

  const boardId = await orderService.createOrderAndGetBoardId(
    payload,
    items,
    user.id,
    references
  );

  const applicant = await userService.getApplicantsByUserId(user.id);
  let type;
  if (payload.type === "ALL") {
    type = "올인원 서비스";
  } else if (payload.type === "APPLICATION") {
    type = "출원 서비스";
  } else {
    type = "디자인 서비스";
  }
  let titleString = `${type} - ${items[0].title}`;
  if (items.length > 1) {
    titleString = `${type} - ${items[0].title}, ${items[1].title}`;
  }
  if (!applicant) {
    const test = await mailingApplication(
      user.name || "",
      user.email || "",
      payload.productTypeCodes,
      payload.trademarkNameKr,
      payload.trademarkNameEn,
      payload.serviceIntroduction,
      titleString,
      payload.type
    );
    return "gotoApplicant";
  }

  return boardId;
}
