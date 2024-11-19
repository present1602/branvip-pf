"use client";

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
import { useScrapStore } from "@/hooks/scrap.store";


const infoText = "아직 스크랩한 로고가 없으시네요."

export default function LogoPageFromDB() {
    const { trademarks } = useScrapStore()

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
                {trademarks.length > 0
                    ?
                    <MyScrapLogoList listData={trademarks} />
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