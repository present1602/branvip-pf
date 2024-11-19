"use server";

import {getServerUserOrRedirect} from "@/actions/authAction";
import {userService} from "@/services/user.service";
import {orderService} from "@/services/order.service";
import {Order, OrderType, PricingType} from "@prisma/client";
import {mailingApplication} from "@/pages/api/mailing-application";

export interface OrderActionProps {
  orderProps: ReqOrderProps;
  applicantProps: OrderItemProps;
  designProps: OrderItemProps;
  referenceTrademarks: ITrademark[];
  applicationProps: ApplicationProps;
}

export interface ApplicationProps {
  name: string;
  phoneNumber: string;
  email: string;
}
export interface ReqOrderProps {
  type: OrderType;
  whatToInclude?: string;
  designRequests?: string;
  isLogoIncluded?: boolean;
  trademarkNameKr?: string;
  trademarkNameEn?: string;
  uploadImageUrl?: string[];
  selectedMoods: string[];
  productTypeCodes: string[];
  referenceAiImageUrls: string[];
  finalPaymentPrice: number;
  serviceIntroduction?: string;
  applicationMultiplier: number;
  tenPercentDiscountAmount: number;
  totalPatentOfficeFee: number;
  simultaneousTrademarkKnEn: boolean;
  logoType: string;
  recommendLogoImagePath?: string[];
  colors?: string[];
  otherRequest?: string;
  priorityScreening?: string[];
}
interface ITrademark {
  applicationNumber: string;
  imageUrl: string;
}

export interface OrderItemProps {
  type: PricingType;
  title: string;
  price: number;
  features: string[];
}

const payCallbackActions2 = async ({
  orderProps,
  applicantProps,
  designProps,
  referenceTrademarks,
  applicantId,
}: any) => {
  const { id } = await getServerUserOrRedirect();
  const user = await userService.getUserProfileOrThrow(id);

  try {
    const result: Order = await orderService.createOrder(
      orderProps,
      applicantProps,
      designProps,
      referenceTrademarks,
      id,
      applicantId
    );
    if (result) {
      let items = "서비스"
      if (orderProps.type === "ALL") {
        items = "올인원 서비스"
      }

      try {
        const test = await mailingApplication(
            user.name || "",
            user.email || "",
            orderProps.productTypeCodes,
            orderProps.trademarkNameKr,
            orderProps.trademarkNameEn,
            orderProps.serviceIntroduction,
            items,
            orderProps.type
        );
      } catch (e) {
        console.error("메일 생성에 실패했습니다");
      }
      return result;
    } else {
      console.error("결제내역을 생성하지 못했습니다.");
    }
  } catch (e) {
    console.error("Error occurred while creating order: ", e);
    return;
  }
};

export default payCallbackActions2;
