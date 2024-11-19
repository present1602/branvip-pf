import { serviceMap } from "@/lib/utils";
import { Order, OrderType, Prisma, Order as PrismaOrder, UserApplicant } from "@prisma/client";
import { formatDateTimeString } from "./formatters";
import { DateTime } from "next-auth/providers/kakao";


// type ServiceType = keyof typeof serviceMap; // "ALL" | "DESIGN" | "APPLICATION"

// type ServiceTypeValue = typeof serviceMap[ServiceType]; 

/* 사용안함. 추후 사용할지도 몰라서 일단 남김. 지워도 됨. */
// type ServiceType = 'ALL' | 'DESIGN' | 'APPLICATION';

// export interface IOrderProcessed {
//     createdAt: Date,
//     id: string,
//     type: ServiceType,
//     finalPaymentPrice: string
//     name: string
//     applicant: UserApplicant | null

// }
// export const processOrderData = (orders: Order[]) => {

//     // const formattedOrders = orders.map((order) => ({
//     //     createdAt: formatDateTimeString(order.createdAt),
//     //     id: order.id,
//     //     type: serviceMap[order.type],
//     //     finalPaymentPrice: `${order.finalPaymentPrice.toLocaleString()}원`, // `totalPatentOfficeFee`로 변경
//     //     name: order.applicant ? order.applicant.name : ''
//     // }));

//     // // 필요한 순서대로 정렬
//     // const sortedOrders = formattedOrders.sort((a, b) => {
//     //     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//     // });


//     // return sortedOrders;
// }