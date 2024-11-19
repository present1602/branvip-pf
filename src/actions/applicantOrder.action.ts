"use server";

import { orderApplicantService } from "@/services/orderApplicant.service";
import { getServerUserOrRedirect } from "@/actions/authAction";
import { userService } from "@/services/user.service";

export interface IDataProps {
  phoneNumber: string;
  name: string;
  email: string;
  applicantNumber: string;
  option?: string;
  patentCustomerNumber?: string;
  nameEn?: string;
  registerNumber?: string;
  address?: string;
  addressDetail?: string;
  addressPostCode?: string;
  signatureUrl?: string;
  bizRegistrationNumber?: string;
  corpRegistrationNumber?: string;
  companyName?: string;
  companyNameEn?: string;
  ownerPhoneNumber?: string;
  ownerEmail?: string;
  type?: string;
}

export const creatApplicantEnterOrder = async (
  data: IDataProps,
  applicantId: string
) => {
  const { id } = await getServerUserOrRedirect();
  const userInData = {
    ...data,
    userId: id,
  };

  // const result = await orderApplicantService.createApplicantEnterOrder(
  //   userInData,
  //   orderId
  // );

  try {
    const result = await orderApplicantService.enterAddApplicantInfo(
      userInData,
      applicantId
    );
    return result;
  } catch (err) {
    console.error(err);
  }
};
