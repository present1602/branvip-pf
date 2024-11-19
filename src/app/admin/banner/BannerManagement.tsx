"use client";

import Button from "@/components/v3/components/BUI/Button/Button";
import { FC, useMemo, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import Link from "next/link";
import BannerCard from "@/app/admin/banner/component/BannerCard";

interface IProps {
  banners: IBannerProps[];
}

export interface IBannerProps {
  status: string;
  id: number;
  title: string;
  description: string | null;
  imageUrlPc: string;
  imageUrlMobile: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  link: string | null;
}

const BannerManagement: FC<IProps> = ({ banners }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(banners.length / rowsPerPage);

  const bannerItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return banners.slice(start, end);
  }, [page, banners]);

  return (
    <>
      <div className="hidden w-full self-start border-b pb-5 xl:inline">
        <span className="text-[22px] font-semibold">배너 관리</span>
      </div>
      <div className="flex flex-col gap-[20px] xl:flex-row-reverse xl:justify-between">
        <div className="self-end">
          <Link href={"/admin/banner/upload"}>
            <Button type="white">
              <span className="text2--bold text2-bold text-primary_scale-70">
                새로운 배너 등록하기
              </span>
            </Button>
          </Link>
        </div>
        <div className="self-end">
          <span className="text-[15px]">
            총 <span className="text-[#00B672]">{banners.length}</span>건
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <div className="grid h-11 grid-cols-[1fr_1fr_0.5fr_100px] place-items-center bg-gray_scale-40 text-[15px] text-gray_scale-400">
            <div className="">게시기간</div>
            <div className="">배너</div>
            <div className="">상태</div>
            <div className="">배너제거</div>
          </div>
          {bannerItems.map((data, index) => (
            <BannerCard key={index} data={data} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination
          loop
          isCompact
          showControls
          variant="light"
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    </>
  );
};

export default BannerManagement;
