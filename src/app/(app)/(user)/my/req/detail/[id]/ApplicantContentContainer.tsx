"use client";

import { ContentCard } from "@/components/layouts/my/ContentCard"
import { ApplicantType, UserApplicant } from "@prisma/client"
import IndividualApplicantReadOnly from "./IndividualApplicantReadOnly"
import { useState } from "react"
import { ContentCardWithAction } from "@/components/layouts/my/ContentCardWithAction";
import DrawUp from "@/assets/drawup.png"
import DrawDown from "@/assets/drawdown.png"
import Image from "next/image";
import CompanyApplicantFormReadOnly from "./CompanyApplicantFormReadOnly";

interface IProps {
    applicant: UserApplicant
}



export default function ApplicantContentContainer({ applicant }: IProps) {
    const [isContentOpen, setIsContentOpen] = useState(true)
    const action1 = (
        <Image src={DrawUp} alt='' onClick={() => setIsContentOpen(false)} className="cursor-pointer" />
    )
    const action2 = (
        <Image src={DrawDown} alt='' onClick={() => setIsContentOpen(true)} className="cursor-pointer" />
    )

    return (
        // <ContentCardWithAction title="출원인 정보" isDivider={true} action={isContentOpen ? actionDrawUp : actionDrawDown}  >
        <ContentCardWithAction title="출원인 정보" isDivider={true} action={isContentOpen ? action1 : action2} >
            {applicant.type === ApplicantType.INDIVIDUAL
                &&
                <IndividualApplicantReadOnly applicant={applicant} isContentOpen={isContentOpen} />
            }
            {applicant.type === ApplicantType.COMPANY
                &&
                <CompanyApplicantFormReadOnly applicant={applicant} isContentOpen={isContentOpen} />
            }
        </ ContentCardWithAction>
    )
}