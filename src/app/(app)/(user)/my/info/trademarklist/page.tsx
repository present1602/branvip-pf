import { ContentCard } from "@/components/layouts/my/ContentCard";
import { SimpleInfoContainer } from "@/components/layouts/my/SimpleInfoContainer";
import { TitleCard } from "@/components/layouts/my/TitleCard";
import MyTrademarkList from "./MyTrademarkList";
import { getServerUserOrRedirect } from "@/actions/authAction";
import { userService } from "@/services/user.service";


const infoText1 = "아직 등록된 출원인 번호가 없습니다."
const infoText2 = "출원인을 등록하고 편리하게 상표를 관리해보세요."


export default async function TrademarkListPage() {

    const user = await getServerUserOrRedirect()

    const trademarks = await userService.getMyTrademarks(
        user.id
    );


    // application_number: '4020230238804',
    // application_reference_number: ' ',
    // image_url: 'http://plus.kipris.or.kr/kiprisplusws/fileToss.jsp?arg=ed43a0609e94d6e251697a9d72a913440be47db3b03c4b7316b214b5876d576113677c91baf10536cd4922e90c45fe61f7e820706a9c65c9',
    // status: '등록',
    // title: 'BRANVIP',
    // applicant_name: '조윤정',
    // agent_name: ''


    return (
        <div className="flex w-full flex-col">
            <TitleCard title="내 정보" />
            <ContentCard titleLarge={"내 상표"}>
                {
                    trademarks.length > 0 ?
                        // <MyTrademarkList listData={logoList} userId={user.id} />
                        <MyTrademarkList listData={trademarks} userId={user.id} />
                        :
                        <>
                            <div className="border-b my-4" />
                            <SimpleInfoContainer className="h-[374px]">
                                <p className="text-center text-gray-400 text-[28px]">
                                    {infoText1}
                                </p>
                                <div className="my-1" />
                                <p className="text-center text-gray-300 body1-medium">
                                    {infoText2}
                                </p>
                            </SimpleInfoContainer>
                        </>
                }
            </ContentCard>
        </div>
    )

}