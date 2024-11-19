import { ContentCard } from "@/components/layouts/my/ContentCard";
import { TitleCard } from "@/components/layouts/my/TitleCard";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import { ApplicantType } from "@prisma/client";
import IndividualApplicantForm from "../components/IndividualApplicantForm";
import CompanyApplicantForm from "../components/CompanyApplicantForm";
import { getApplicantDetail } from "@/actions/applicant.action";


interface IProps {
    params: {
        id: string;
    }
}

export default async function PatentRegistrationNumberInfoPage({ params: { id } }: IProps) {
    const applicant: any = await getApplicantDetail(id)

    return (
        <div>
            <TitleCard title="내 정보" />
            <ContentCard titleLarge="내 특허고객정보" isDivider={true}>
                <div className="heading2 text-gray-800">등록 특허 고객번호 수정</div>
                <div className="flex my-5">
                    <BasicUIButton
                        className={`mx-[5px] my-[10px] rounded px-[30px] py-[10px] text2-bold ${applicant?.type === ApplicantType.INDIVIDUAL && 'bg-gray-400 text-white'}`}
                    > 개인</BasicUIButton>
                    <BasicUIButton
                        className={`mx-[5px] my-[10px] rounded px-[30px] py-[10px] text2-bold ${applicant?.type === ApplicantType.COMPANY && 'bg-gray-500 text-white'}`}
                    > 법인</BasicUIButton>
                </div>
                {
                    applicant!.type === ApplicantType.INDIVIDUAL
                    &&
                    // <IndividualApplicantForm applicant={applicant} isEditMode={true} />
                    <IndividualApplicantForm applicant={applicant} />
                }
                {
                    applicant!.type === ApplicantType.COMPANY
                    &&
                    <CompanyApplicantForm applicant={applicant} />
                }

            </ContentCard>
        </div>
    )
}