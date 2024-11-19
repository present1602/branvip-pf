"use client";

import React, { FC, useState, useTransition } from "react";
import { Arrow } from "@/components/svg";
import Label from "@/components/v3/components/BUI/Label/Label";
import Input2 from "@/components/v3/components/BUI/Input2/Input2";
import ImageUploadBox from "@/components/v3/components/ImageUploadBox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface IBannerProps {
  id: number,
  title: string,
  description: string | null,
  imageUrlPc: string,
  imageUrlMobile: string,
  startDate: Date,
  endDate: Date,
  link: string | null,
}

interface IBannerEditProps {
  banner: IBannerProps;
}


const BannerEdit: FC<IBannerEditProps> = ({ banner }) => {
  const [title, setTitle] = useState(banner.title);
  const [startDate, setStartDate] = useState<Date | null>(banner.startDate);
  const [endDate, setEndDate] = useState<Date | null>(banner.endDate);
  const [description, setDescription] = useState<string | null>(banner.description);
  const [link, setLink] = useState(banner.link);
  const [selectedFilePC, setSelectedFilePC] = useState<File | null>(null);
  const [selectedFileMobile, setSelectedFileMobile] = useState<File | null>(null);
  const router = useRouter();
  const [, startUpload] = useTransition();

  const handleUpdate = () => {
    startUpload(async () => {

      console.log(banner.link);
      console.log(link);

      const formData = new FormData();
      formData.append("id", banner.id.toString());

      if (banner.title != title) {
        formData.append("title", title);
      }
      if (banner.description != description) {
        if (description != null) {
          formData.append("description", description);
        }
      }
      if (banner.startDate.getTime() != startDate?.getTime()) {
        formData.append("startDate", startDate ? startDate.toISOString() : "");
      }
      if (banner.endDate.getTime() != endDate?.getTime()) {
        formData.append("endDate", endDate ? endDate.toISOString() : "");
      }
      if (banner.link != link) {
        formData.append("link", link ? link : "/");
      }
      if (selectedFilePC) {
        formData.append("pcFile", selectedFilePC);
      }
      if (selectedFileMobile) {
        formData.append("mobileFile", selectedFileMobile);
      }


      const response = await fetch("/api/banner", {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "성공",
          description: "배너를 성공적으로 수정했습니다.",
        });
        router.push("/admin/banner");
      } else {
        toast({
          title: "실패",
          description: "배너를 수정하는데 실패했습니다.",
        });
      }
    });

  };


  return (
    <>

      <div className="self-start xl:pb-5 pb-3 border-b w-full flex items-center-center gap-2">
        <button className="xl:hidden" onClick={() => {
          router.push("/admin/banner");
        }}>
          <Arrow />
        </button>
        <span className="xl:text-[22px] text-[17px] font-semibold">배너</span>
      </div>
      <div className="xl:border rounded-[10px] xl:p-[30px] flex flex-col gap-5">
        <div>
          <Label label={"배너 제목"}>
            <Input2 clearBtn onChange={(e) => setTitle(e.target.value)} value={title} />
          </Label>
        </div>
        <div>
          <Label label={"배너 기간"}>
            <div className="flex items-center gap-2">
              <Input2 clearBtn type={"date"}
                      onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                      value={startDate ? startDate.toISOString().substr(0, 10) : ""} />
              ~
              <Input2 clearBtn type={"date"}
                      onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                      value={endDate ? endDate.toISOString().substr(0, 10) : ""} />
            </div>

          </Label>
        </div>
        <div>
          <Label label={"배너 설명"}>
                <textarea className={"w-full border rounded"} onChange={(e) => setDescription(e.target.value)}
                          value={description ? description : ""} />
          </Label>
        </div>
        <div>
          <Label label={"PC 배너 이미지 업로드"}>
            <ImageUploadBox setSelectedFile={setSelectedFilePC} previewImg={banner.imageUrlPc} />
          </Label>
        </div>
        <div>
          <Label label={"모바일 배너 이미지 업로드"}>
            <ImageUploadBox setSelectedFile={setSelectedFileMobile} previewImg={banner.imageUrlMobile} />
          </Label>
        </div>
        <div>
          <Label label={"배너 링크"}>
            <Input2 clearBtn onChange={(e) => setLink(e.target.value)} value={link ? link : ""} />
          </Label>
        </div>
        <div className="border-t" />

        <div className="flex justify-end gap-3">
          <Link href={"/admin/banner"}>
            <button className="border rounded-[4px] text-gray_scale-500 px-[18px] py-[10px]">
              취소
            </button>
          </Link>
          <button className="border rounded-[4px] text-gray_scale-500 px-[18px] py-[10px]" onClick={handleUpdate}>
            수정
          </button>
        </div>
      </div>
    </>
  );
};

export default BannerEdit;
