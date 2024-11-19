"use client";

import { useState } from "react"
import { ContentCardWithAction } from "@/components/layouts/my/ContentCardWithAction";
import DrawUp from "@/assets/drawup.png"
import DrawDown from "@/assets/drawdown.png"
import Image from "next/image";
import OrderInfo from "./OrderInfo";
import { Order, UserApplicant, OrderItem } from "@prisma/client";

interface IProps extends Order {
    data: Order & {
        items: OrderItem[];
        applicant: UserApplicant | null;
    };
}

export default function OrderContentContainer({ data }: IProps) {
    const [isContentOpen, setIsContentOpen] = useState(true)
    const action1 = (
        <Image src={DrawUp} alt='' onClick={() => setIsContentOpen(false)} className="cursor-pointer" />
    )
    const action2 = (
        <Image src={DrawDown} alt='' onClick={() => setIsContentOpen(true)} className="cursor-pointer" />
    )

    return (
        // <ContentCardWithAction title="출원인 정보" isDivider={true} action={isContentOpen ? actionDrawUp : actionDrawDown}  >
        <ContentCardWithAction title="결제정보" isDivider={true} action={isContentOpen ? action1 : action2}>
            {/* <div className="flex flex-col px-[17px] py-6 shadow-md rounded"> */}
            <OrderInfo data={data} isContentOpen={isContentOpen} />
            {/* </div> */}
        </ContentCardWithAction>
    )
}