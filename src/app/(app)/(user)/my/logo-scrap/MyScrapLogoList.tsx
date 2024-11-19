"use client"

import { Pagination } from "@nextui-org/react";
import MyScrapLogoCard from "./MyScrapLogoCard";
import { LogoScrap } from "@prisma/client";
import { v4 } from "uuid"
import Image from "next/image";


export interface IMyScrapLogo {
    applicationNumber: string,
    imageUrl: string,
}

interface IProps {
    listData: IMyScrapLogo[]
}

export default function MyScrapLogoList({ listData }: IProps) {
    return (
        <>
            <div className="bg-primary_colorless-20 border rounded-xl border-gray-90 p-5">
                <div className="grid gap-5 grid-cols-2 xl:grid-cols-4">
                    {
                        listData.map((logo: IMyScrapLogo) => (
                            <MyScrapLogoCard logo={logo} key={v4()} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}