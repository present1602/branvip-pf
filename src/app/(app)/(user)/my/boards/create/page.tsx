import React from "react";
import { TitleCard } from "@/components/layouts/my/TitleCard";
import { ContentCard } from "@/components/layouts/my/ContentCard";
import { CreateBoardForm } from "./CreateBoardForm";
import Link from "next/link";
import Image from "next/image";
import IconArrow from "@/assets/icon-arrow_bottom-24_2.png"

export default function CreateBoard() {

  return (
    <div className="flex w-full flex-col">

      <TitleCard title="1:1 문의하기" />

      <ContentCard>
        <div className="mb-4 flex items-center gap-1">
          <Link href={"/my/boards"}>
            <Image src={IconArrow} alt="" />
          </Link>
          <span className="heading1">문의 작성하기</span>
        </div>
        <div className="border-b my-4" />
        <CreateBoardForm />

      </ContentCard>
      
    </div>

  );
}