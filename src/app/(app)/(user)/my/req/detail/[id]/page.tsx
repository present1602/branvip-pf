import { getServerUserOrRedirect } from "@/actions/authAction";
import { ContentCard } from "@/components/layouts/my/ContentCard";
import { TitleCard } from "@/components/layouts/my/TitleCard";
import { orderService } from "@/services/order.service";
import OrderInfo from "./OrderInfo";
import ApplicantContentContainer from "./ApplicantContentContainer";
import UserInfoContentContainer from "./UserInfoContentContainer";
import OrderContentContainer from "./OrderContentContainer";

interface IProps {
    params: {
        id: string
    }
}


export default async function ReqDetailPage({ params: { id } }: IProps) {
    const user = await getServerUserOrRedirect()

    const data = await orderService.getOrderById(id);


    const printStringArray = (arrayValue: string[]) => {
        if (Array.isArray(arrayValue)) {
            return arrayValue.join(',')
        }
        return ''
    }

    return (
        <div className="flex w-full flex-col">
            <TitleCard title="내 의뢰목록 관리" />
            {
                data.applicant ?
                    <ApplicantContentContainer applicant={data.applicant} />
                    :
                    <UserInfoContentContainer user={user} />
            }
            <OrderContentContainer data={data} />
        </div >
    )
}