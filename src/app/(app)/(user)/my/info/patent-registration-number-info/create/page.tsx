"use client"

import { ContentCard } from "@/components/layouts/my/ContentCard";
import { TitleCard } from "@/components/layouts/my/TitleCard";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import IndividualApplicantForm from "../components/IndividualApplicantForm";
import CompanyApplicantForm from "../components/CompanyApplicantForm";
import { useApplicantStore } from "@/hooks/applicant.store";
import { ApplicantType } from "@prisma/client";

export default function CreatePatentApplicantPage() {

    const [activeTab, setActiveTab] = useState<ApplicantType>('INDIVIDUAL')
    // const { applicant, setApplicant } = useApplicantStore();

    const handleTabChange = (tab: ApplicantType) => {
        setActiveTab(tab)
        // setApplicant({ ...applicant, type: tab })
    }

    return (
        <div>
            <TitleCard title="내 정보" />
            <ContentCard titleLarge="내 특허고객정보" isDivider={true}>
                <div className="heading2 text-gray-800">등록 특허 고객번호 등록하기</div>
                <div className="flex my-5">
                    <BasicUIButton className="mx-[5px] my-[10px] rounded px-[30px] py-[10px] text2-bold"
                        onClick={() => handleTabChange('INDIVIDUAL')} isPrimary={activeTab === 'INDIVIDUAL'} > 개인</BasicUIButton>
                    <BasicUIButton className="mx-[5px] my-[10px] rounded px-[30px] py-[10px] text2-bold"
                        onClick={() => handleTabChange('COMPANY')} isPrimary={activeTab === 'COMPANY'} > 법인</BasicUIButton>
                </div>
                {
                    activeTab === 'INDIVIDUAL'
                    &&
                    <IndividualApplicantForm />
                }
                {
                    activeTab === 'COMPANY'
                    &&
                    <CompanyApplicantForm />
                }

            </ContentCard>
        </div>
    )
}
