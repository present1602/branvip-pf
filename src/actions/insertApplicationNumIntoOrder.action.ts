"use server";

import { orderApplicantService } from "@/services/orderApplicant.service";

const insertApplicationNumIntoOrder = async (
  orderId: string,
  applicantId: string
) => {
  try {
    const response = await orderApplicantService.ordersWithFilingExperience(
      orderId,
      applicantId
    );
    return response;
  } catch (e) {
    return console.error(e);
  }
};

export default insertApplicationNumIntoOrder;
