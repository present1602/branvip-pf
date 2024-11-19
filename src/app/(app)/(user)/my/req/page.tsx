import { ContentCard } from "@/components/layouts/my/ContentCard";
import { TitleCard } from "@/components/layouts/my/TitleCard";
import ReqContentContainerWithFilter from "./ReqContentContainerWithFilter";
import { userService } from "@/services/user.service";
import { getServerUserOrRedirect } from "@/actions/authAction";
import { orderService } from "@/services/order.service";

export default async function Page() {
    const user = await getServerUserOrRedirect()
    // const reqList = await userService.getApplicantsByUserId(user.id)
    const initialOrders = await orderService.getOrderByUserAndType(user.id);

    return (
        <div className="flex w-full flex-col">
            <TitleCard title="내 의뢰목록 관리" />
            <ContentCard titleLarge="전체 의뢰목록" isDivider={true}>
                <ReqContentContainerWithFilter initialOrders={initialOrders ? initialOrders : []} userId={user.id} />
            </ContentCard>
        </div>
    )
}