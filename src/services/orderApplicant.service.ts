import { db } from "@/utils/db";
import {
  ApplicationProps,
  OrderItemProps,
  ReqOrderProps,
} from "@/actions/payCallback.actions";
import { Prisma, UserApplicant } from "@prisma/client";
interface applicantAndOrderCreationProps {
  orderProps: ReqOrderProps;
  applicantProps: OrderItemProps;
  designProps: OrderItemProps;
  referenceTrademarks: ITrademark[];
  applicationProps: ApplicationProps;
  id: string | undefined;
}
interface ITrademark {
  applicationNumber: string;
  imageUrl: string;
}

class OrderApplicantService {
  async createApplicantEnterOrder(data: Prisma.UserApplicantCreateInput, orderId: string) {
    const applicant = (await db.userApplicant.create({
      data: {
        user: {
          connect: {
            id: data.id
          }
        },
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        applicantNumber: data.applicantNumber,
        nameEn: data.nameEn,
        registerNumber: data.registerNumber,
        address: data.address,
        addressDetail: data.addressDetail,
        addressPostCode: data.addressPostCode,
        signatureUrl: data.signatureUrl,
        bizRegistrationNumber: data.bizRegistrationNumber,
        corpRegistrationNumber: data.corpRegistrationNumber,
        companyName: data.companyName,
        companyNameEn: data.companyNameEn,
        ownerPhoneNumber: data.ownerPhoneNumber,
        ownerEmail: data.ownerEmail,
        type: data.type,
      },
    })) as UserApplicant;

    const order = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        applicantId: applicant.id,
      },
    });

    return { applicant, order };
  }
  async ordersWithFilingExperience(orderId: string, applicantId: string) {
    try {
      const order = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          applicantId: applicantId,
        },
      });
      return order;
    } catch (e) {
      return e;
    }
  }

  async applicantAndOrderCreation({
    orderProps,
    applicantProps,
    designProps,
    referenceTrademarks,
    applicationProps,
    id,
  }: any) {
    const type = "ALL";
    const koreaTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
    });
    let orderNumber;
    const date = new Date(koreaTime);
    const year = date.getFullYear().toString().slice(2, 4);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const dateString = `${year}${month}${day}`;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    try {
      // 특정 날짜와 타입에 따른 주문 개수를 세어 순번을 생성
      const ordersCount = await db.order.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lt: endOfDay,
          },
          type: type as any, // 'type' 타입을 명시적으로 설정
        },
      });

      orderNumber = `A${dateString}${String(ordersCount + 1).padStart(4, "0")}`;
    } catch (e) {
      console.error("Error occurred while getting orders count: ", e);
    }
    try {
      const application = (await db.userApplicant.create({
        data: {
          ...applicationProps,
          userId: id,
        },
      })) as UserApplicant;

      if (application) {
        const response = await db.order.create({
          data: {
            userId: id || "notfounduser",
            applicantId: application.id,
            ...orderProps,
            orderNumber: orderNumber,
            referenceTrademarks: referenceTrademarks
              ? {
                createMany: {
                  data: referenceTrademarks,
                },
              }
              : undefined,
            items: {
              create: [applicantProps, designProps],
            },
          },
        });
        console.log(response);
        return application;
      }
    } catch (e) {
      console.error("Error occurred while creating applicant and order: ", e);
    }
  }

  //@ts-ignore
  async enterAddApplicantInfo(userInData, applicantId) {
    try {
      const response = await db.userApplicant.update({
        where: {
          id: applicantId,
        },
        data: {
          ...userInData,
        },
      });
      return response;
    } catch (e) {
      console.error("Error occurred while updating applicant info: ", e);
    }
  }
}

export const orderApplicantService = new OrderApplicantService();
