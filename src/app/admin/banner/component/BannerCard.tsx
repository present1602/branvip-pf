"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useTransition } from "react";
import { IBannerProps } from "@/app/admin/banner/BannerManagement";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IBannerCard {
  data: IBannerProps;
}
const BannerCard: React.FC<IBannerCard> = ({ data }) => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 전파를 막습니다.
    e.stopPropagation();
    // 여기에서 버튼 클릭 시 수행할 동작을 추가합니다.
    const isDelete = confirm("배너를 삭제하시겠습니까?");

    if (isDelete) {
      startTransition(async () => {
        try {
          const result = await axios.delete("/api/banner", {
            params: {
              id: data.id,
            },
          });
          if (result.status === 200) {
            alert("삭제되었습니다");
          } else {
            alert(
              `삭제에 실패했습니다 관리자에게 문의해주세요 ${result.status}`
            );
          }
        } catch (e) {
          console.error(e);
        } finally {
          router.push("/admin/banner");
        }
      });
    }
  };

  return (
    <Link
      href={`/admin/banner/${data.id}`}
      className="grid h-[100px] grid-cols-[1fr_1fr_0.5fr_100px] place-items-center border-b"
    >
      <div className="flex-col">
        <div>
          {new Date(data.startDate).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}{" "}
          ~
        </div>
        <div>
          {new Date(data.endDate).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      </div>
      <div className=" flex flex-col items-center gap-2">
        <div className=" h-[12px] overflow-hidden xl:h-[27px]">
          <Image src={data.imageUrlPc} alt={"pc"} width={300} height={27} />
        </div>
        <div className=" h-[35px] overflow-hidden xl:h-[53px]">
          <Image src={data.imageUrlMobile} alt={"pc"} width={200} height={53} />
        </div>
      </div>
      <div className="">{data.status}</div>
      <button
        onClick={handleButtonClick}
        className="text2-bold rounded-[4px] border border-yellowRed-60 bg-system-coral bg-opacity-20 px-2 text-yellowRed-60"
      >
        X
      </button>
    </Link>
  );
};

export default BannerCard;
