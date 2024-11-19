"use client";

import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { Link } from "lucide-react";
import InfoList from "./InfoList";
import { SimpleInfoContainer } from "@/components/layouts/my/SimpleInfoContainer";
import { useState } from "react";
import { ApplicantType } from "@prisma/client";
import { getApplicantsByType } from "@/actions/applicant.action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface IPros {
    initialList: any;
    userId?: string;
}

export default function ApplicantFilter({ initialList }: IPros) {
    const [applicants, setApplicants] = useState(initialList);
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<ApplicantType | 'TAKE_ALL'>('TAKE_ALL')

    function handleFilter(type: ApplicantType | 'TAKE_ALL') {
        async function getData() {
            try {

                const resData = type == 'TAKE_ALL' ?
                    await getApplicantsByType()
                    :
                    await getApplicantsByType(type)

                setApplicants(resData)
                setActiveTab(type)
            } catch (err: any) {
                toast({
                    title: '조회 도중 에러가 발생했습니다.',
                    variant: 'destructive',
                })
                console.log("filter err:", err)
            }
        };
        getData()
    }


    return (
        <div className="flex flex-col">
            <div className="flex py-5">
                <div className="flex flex-1 gap-[10px]">
                    <BasicUIButton className="px-[12px] py-[10px] md:px-[30px] rounded-[6px]"
                        isPrimary={activeTab == 'TAKE_ALL' ? true : false}
                        onClick={() => handleFilter('TAKE_ALL')}
                    >
                        전체
                    </BasicUIButton>
                    <BasicUIButton className="px-[12px] py-[10px] md:px-[30px] rounded-[6px]"
                        isPrimary={activeTab == ApplicantType.INDIVIDUAL ? true : false}
                        onClick={() => handleFilter('INDIVIDUAL')}
                    >
                        개인
                    </BasicUIButton>
                    <BasicUIButton className="px-[12px] py-[10px] md:px-[30px] rounded-[6px]"
                        isPrimary={activeTab == ApplicantType.COMPANY ? true : false}
                        onClick={() => handleFilter('COMPANY')} >
                        법인
                    </BasicUIButton>
                </div>
                {/* <Link href={'/my/info/patent-registration-number-info/create'} > */}
                <BasicUIButton className="px-[18px] py-[10px] rounded"
                    onClick={() => router.push('/my/info/patent-registration-number-info/create')}
                >
                    등록하기
                </BasicUIButton>
                {/* </Link> */}
            </div>
            {applicants.length > 0
                ?
                <InfoList paramApplicants={applicants} />
                :
                <SimpleInfoContainer>
                    <div className="flex items-center justify-center heading2 my-20 text-gray-700">
                        특허고객정보가 없습니다.
                    </div>
                </SimpleInfoContainer>
            }
        </div>
    )
}