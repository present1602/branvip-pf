import { FC } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const FloatingBtn:FC = () => {
  return(
    <Link className="fixed bottom-24 z-50 xl:inline hidden" href={"/allinone/check"}>
      <Button className="MS_btn w-[272px] h-[63px]">
        <span className="MS_btn_text"> 의뢰하기</span>
      </Button>
    </Link>
  )
}

export default FloatingBtn;