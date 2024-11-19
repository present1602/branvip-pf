"use client"

import { Pagination } from "@nextui-org/react";
import MyScrapLogoCard from "./MyScrapLogoCard";
import { LogoScrap } from "@prisma/client";


export interface IMyScrapLogo {
    id: number,
    trademarkId: number,
    trademark: {
        imageUrl: string | null
    },
    isScrapped: boolean
}

interface IProps {
    userId: string;
    listData: IMyScrapLogo[]
}

export default function MyScrapLogoList({ userId, listData }: IProps) {
    return (
        <>
            <div className="bg-primary_colorless-20 border rounded-xl border-gray-90 p-5">
                <div className="grid gap-5 grid-cols-2 xl:grid-cols-4">
                    {
                        listData.map((logo: IMyScrapLogo) => (
                            <MyScrapLogoCard userId={userId} logo={logo} key={logo.id} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

{/* <Pagination total={listData.length} /> */ }