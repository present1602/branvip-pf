"use client"

import Image from "next/image";
import { ITrademarkCard } from "@/interfaces";


interface IProps {
    logo: ITrademarkCard
}

export default function MyTrademarkCard({ logo }: IProps) {

    return (
        <div className="relative rounded-[6px] border bg-white shadow-sm hover:shadow-lg">
            <div className="relative flex h-[122px] shrink-0 items-center justify-center p-2 xl:h-44">
                <Image
                    className="p-4"
                    src={logo.image_url ?? ""}
                    alt="scrap logo"
                    sizes={"120px"}
                    fill
                    style={{ objectFit: "contain" }}
                />
            </div>
        </div>
    );
}