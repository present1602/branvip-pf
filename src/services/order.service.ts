import {serviceMap} from "@/lib/utils";
import {db} from "@/utils/db";
import {Order, OrderType, Pricing, Prisma, UserApplicant,} from "@prisma/client";
import {OrderItemProps, ReqOrderProps} from "@/actions/payCallback.actions";

import {formatDateTimeString} from "@/utils/formatters";

// import { IOrderProcessed, processOrderData } from "@/utils/orderUtis";

interface OrderReference {
  applicationNumber: string;
  imageUrl: string;
}

export interface IOrderItem {
  id: string;
  title: string;
  price: string;
  features: string[];
}


export interface IOrderWithApplicant extends Order {
  applicant: UserApplicant | null
  items: IOrderItem[]
}


class OrderService {
  async createOrderAndGetBoardId(
    dto: Prisma.OrderCreateInput,
    items: Pricing[],
    userId: string,
    references?: OrderReference[]
  ) {
    const order = await db.order.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
        items: {
          createMany: {
            data: items.map((item) => ({
              type: item.type,
              title: item.title,
              price: item.price,
              features: [...item.features, ...item.primaryFeatures],
            })),
          },
        },
        referenceTrademarks: references
          ? {
            createMany: {
              data: references,
            },
          }
          : undefined,
      },
      select: {
        id: true,
        type: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const serviceTitle = serviceMap[order.type];
    const newBoard = await db.userBoard.create({
      data: {
        title: serviceTitle,
        isAdmin: true,
        content: `안녕하세요, ${order.user?.name || "고객"
          }님. 의뢰해 주셔서 감사합니다.\n내부적으로 검토 후 진행 방식에 대해 안내해 드리겠습니다.`,
        actionLink: `/me/orders/${order.id}`,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newBoard.id;
  }


  async getOrderById(orderId: string) {
    const order = await db.order.findUniqueOrThrow({
      where: { id: orderId },
      include: {
        items: true,
        applicant: true,
      },
    });
    return order;
  }

  async createOrder(
    orderProps: ReqOrderProps,
    applicantProps: OrderItemProps,
    designProps: OrderItemProps,
    referenceProps: any[],
    id: string,
    applicantId: string
  ): Promise<Order> {
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
    const response = await db.order.create({
      data: {
        ...orderProps,
        orderNumber: orderNumber,
        user: {
          connect: {
            id: id,
          },
        },
        applicant: {
          connect: {
            id: applicantId,
          },
        },
        referenceTrademarks: referenceProps
          ? {
            createMany: {
              data: referenceProps,
            },
          }
          : undefined,
        items: {
          create: [applicantProps, designProps],
        },
      },
    });

    return response as Order;
  }

  async getOrderByUserAndType(userId: string, type?: OrderType) {
    let orders;
    if (!type) {
      orders = await db.order.findMany({
        where: { userId, type },
        select: {
          id: true,
          type: true,
          status: true,
          operationStatus: true,
          orderNumber: true,
          createdAt: true,
          finalPaymentPrice: true,
          applicant: true,
        },
      });
    } else {
      orders = await db.order.findMany({
        where: { userId, type },
        select: {
          id: true,
          type: true,
          status: true,
          orderNumber: true,
          operationStatus: true,
          createdAt: true,
          finalPaymentPrice: true,
          applicant: true,
        },
      });
    }
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      createdAt: formatDateTimeString(order.createdAt),
      orderNumber: order.orderNumber,
      name: order.applicant ? order.applicant.name : "",
      type: serviceMap[order.type],
      finalPaymentPrice: `${order.finalPaymentPrice.toLocaleString()}원`, // `totalPatentOfficeFee`로 변경
    }));

    // 필요한 순서대로 정렬
    const sortedOrders = formattedOrders.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return sortedOrders;
  }
}

export const orderService = new OrderService();
