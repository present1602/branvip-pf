"use client"

import { Pagination } from "@nextui-org/react";
import MyTrademarkCard from "./MyTrademarkCard";
import { LogoScrap } from "@prisma/client";


export interface IMyTrademarkCard {
    application_number: string | number,
    application_reference_number: string | number,
    image_url: string,
    status?: string
    title?: string
    applicant_name?: string
    agent_name?: string
}

interface IProps {
    listData: IMyTrademarkCard[]
}

// application_number: '4020230238804',
//     application_reference_number: ' ',
//     image_url: 'http://plus.kipris.or.kr/kiprisplusws/fileToss.jsp?arg=ed43a0609e94d6e251697a9d72a913440be47db3b03c4b7316b214b5876d576113677c91baf10536cd4922e90c45fe61f7e820706a9c65c9',
//     status: '등록',
//     title: 'BRANVIP',
//     applicant_name: '조윤정',
//     agent_name: ''


export default function MyTrademarkList({ listData }: any) {

    return (
        <div>
            <div className="mb-4">
                <span className="heading2">특허청에 출원된 상표</span>
            </div>
            <div className="border-b my-4" />
            <div className="bg-primary_colorless-20 border rounded-xl border-gray-90 p-5">
                <div className="grid gap-5 grid-cols-2 xl:grid-cols-5">
                    {
                        listData.map((logo: any, index: number) => (
                            <MyTrademarkCard logo={logo} key={`${logo.applicant_name}_${index}`} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
