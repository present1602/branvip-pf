
import { ContentCard } from "@/components/layouts/my/ContentCard";
import { TitleCard } from "@/components/layouts/my/TitleCard";
import { userService } from "@/services/user.service";
import { getServerUserOrRedirect } from "@/actions/authAction";
import ContentContainerWithFilter from "./ContentContainerWithFilter";




/* pagenation 테스트용 더미데이터
const sample: UserApplicant =
    {
      id: 'cly40war8000010y6vy91n9uy',
      createdAt: new Date("2024-07-02T06:23:36.985Z"),
      userId: 'clxtyvedv0000lgglwz5n4aum',
      type: 'INDIVIDUAL',
      registerNumber: '111122212312',
      name: '홍길',
      nameEn: null,
      email: 'slkf',
      phoneNumber: '01023451111',
      address: '대전 서구 가수원로 5 (가수원동, 은아아파트5단지)',
      addressPostCode: '35389',
      addressDetail: '1234',
      signatureUrl: '',
      IsVerification: false,
      applicantNumber: '12341234'
    }

const applicant = Array.from({ length: 43 }, (_, index) => {
    const newApplicant = { ...sample };
    newApplicant.registerNumber = `${newApplicant.registerNumber}${index + 1}`;
    newApplicant.id = `${newApplicant.id}${index + 1}`;
    
    return newApplicant;
});
*/


export default async function TrademarksPage() {
    const user = await getServerUserOrRedirect()
    const applicants = await userService.getApplicantsByUserId(user.id)

    return (
        <div className="flex flex-col w-full">
            <TitleCard title="내 정보관리" />

            <ContentCard titleLarge="내 특허고객번호 정보" isDivider={true}>
                <ContentContainerWithFilter initialList={applicants} userId={user.id} />
            </ContentCard>
        </div>
    )
}