"use server";

import { ApplicantType, Prisma } from "@prisma/client";
import { getServerUserOrRedirect } from "./authAction";
import { userService } from "../services/user.service";
import { revalidatePath } from "next/cache";

export const setApplicant = async (
  dto: Prisma.UserApplicantCreateWithoutUserInput
) => {
  const user = await getServerUserOrRedirect();

  if (dto.id) {
    await userService.updateMyApplicant(dto.id, dto);
  } else {
    await userService.createMyApplicant(user.id, dto);
  }

  revalidatePath("/my/info/patent-registration-info");
};

export const getApplicantDetail = async (id: string) => {
  const user = await getServerUserOrRedirect();
  const applicant = await userService.getApplicantByIdAndUserId(id, user.id)
  return applicant
}

export const getApplicantsByType = async (type?: ApplicantType) => {
  const user = await getServerUserOrRedirect();
  let applicant;
  if (!type) {
    applicant = await userService.getApplicantsByUserId(user.id)
  } else {
    applicant = await userService.getApplicantsByType(type, user.id)
  }
  return applicant
}


export const getApplicantsByUserId = async (type: ApplicantType) => {
  const user = await getServerUserOrRedirect();
  const applicant = await userService.getApplicantsByUserId(user.id)
  return applicant
}

