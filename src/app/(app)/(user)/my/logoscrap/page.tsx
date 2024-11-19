import { ContentCard } from "@/components/layouts/my/ContentCard";
import { TitleCard } from "@/components/layouts/my/TitleCard";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import LogoList from "./MyScrapLogoList";
import { SimpleInfoContainer } from "@/components/layouts/my/SimpleInfoContainer";
import Image from "next/image";
import MyScrapLogoCard from "./MyScrapLogoCard";
import MyScrapLogoList from "./MyScrapLogoList";
import { getServerUserOrRedirect } from "@/actions/authAction";
import { trademarkService } from "@/services/trademark.service";
import Link from "next/link";



//  logoscrap폴더는 db의 데이터를 가져오고 삭제시에도 db에서 삭제하는 방식. 현재는 로컬스토리지로 구현돼는 logo-scrap폴더 파일들 사용중
//  logoscrp폴더 파일들 안쓰지만 추후 이걸 쓰는 방향으로 수정될 가능성 높음. (로컬스토리지 코드로 가는 이유는 마이페이지 말고 다른 쪽에서 로컬스토리지에 저장되게개발해서임)

const infoText = "아직 스크랩한 로고가 없으시네요."

export default async function LogoPageFromDB() {
    const user = await getServerUserOrRedirect()
    const logoListData = await trademarkService.getMyScrapLogoList(user.id)
    console.log("logoListData : ", logoListData)
    const logoList = logoListData.map(logo => ({
        ...logo,
        isScrapped: true, // 기본값으로 true 설정
    }));

    // const toggleLogo = (logoId: number) => {
    //     const updatedLogoList = logoList.map(logo => {
    //         if (logo.id === logoId) {
    //             return {
    //                 ...logo,
    //                 isScrapped: !logo.isScrapped, // 현재 값의 반대로 토글
    //             };
    //         }
    //         return logo; // 변경하지 않는 요소는 그대로 반환
    //     });
    // }


    return (
        <div className="flex w-full flex-col">
            <TitleCard title="스크랩한 로고" />
            <ContentCard>
                <div className="flex flex-row items-center">
                    <span className="text-gray-500">마음에 드는 상표 스크랩으로 내상표를 뚝딱!!</span>
                    <Link href={"/allinone/check"}>
                        <BasicUIButton isBorderPrimary={true} isTextPrimary={true} className="mx-5 px-[18px] py-[10px]">
                            디자인 의뢰하기
                        </BasicUIButton>
                    </Link>
                </div>
                <div className="border-b my-4" />

                {logoList.length > 0
                    ?
                    <MyScrapLogoList listData={logoList} userId={user.id} />
                    :
                    <SimpleInfoContainer className="py-[80px]">
                        <Image src="/renewal/assets/images/scrap/folder.png" height={131} width={118} alt="scrapbox image(no scrap)" />
                        <p className="text-gray_scale-100 heading1 my-5">{infoText}</p>
                        <BasicUIButton className="px-[20px] py-[10px] text-gray-400 rounded body2-bold">
                            스크랩하러 가기
                        </BasicUIButton>
                    </SimpleInfoContainer>
                }
                <div className="flex justify-center mt-[30px]">
                    <Link href={"/logosearch"}>
                        <BasicUIButton isPrimary={true} className="text2-bold px-[18px] py-[10px]">
                            로고 스크랩하러 가기
                        </BasicUIButton>
                    </Link>
                </div>
            </ContentCard>

        </div>

    )
}