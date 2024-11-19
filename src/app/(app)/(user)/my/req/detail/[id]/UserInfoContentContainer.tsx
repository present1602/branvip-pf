import { UserInfoContent } from "../../../info/user/UserInfoContent"
import { ContentCardWithAction } from "@/components/layouts/my/ContentCardWithAction"

interface IProps {
    user: any
}
export default function UserInfoContentContainer({ user }: IProps) {
    return (
        <ContentCardWithAction title="출원인 정보" isDivider={true}>
            <UserInfoContent user={user} />
        </ContentCardWithAction>
    )
}