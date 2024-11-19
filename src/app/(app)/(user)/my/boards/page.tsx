import { getServerUserOrRedirect } from "@/actions/authAction";
import React from "react";
import { TitleCardWithAction } from "@/components/layouts/my/TitleCardWithAction";
import Link from "next/link";
import BasicUIButton from "@/components/v3/components/BUI/Button/BasicUIButton";
import BoardList from "./BoardList";



const actionButton = (
  <Link href={"/my/boards/create"}>
    <BasicUIButton className="text2-bold border-primary_scale-70 text-primary_scale-70">
      문의하기
    </BasicUIButton>
  </Link>
)

export default async function MyBoards() {

  return (
    <div className="flex w-full flex-col">
      <TitleCardWithAction title="1:1 문의내역" action={actionButton} />
      <BoardList />
    </div>
  );
}
