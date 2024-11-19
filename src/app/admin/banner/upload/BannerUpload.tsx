"use client";

import Label from "@/components/v3/components/BUI/Label/Label";
import Input2 from "@/components/v3/components/BUI/Input2/Input2";
import React, { useState, useTransition } from "react";
import ImageUploadBox from "@/components/v3/components/ImageUploadBox";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Arrow } from "@/components/svg";


const BannerUpload = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [selectedFilePC, setSelectedFilePC] = useState<File | null>(null);
  const [selectedFileMobile, setSelectedFileMobile] = useState<File | null>(null);
  const router = useRouter();
  const [,startUpload] = useTransition();



  const handleUpload = () => {
    startUpload( async () => {
      if (!selectedFilePC || !selectedFileMobile) {
        alert("PC 또는 모바일 파일이 선택되지 않았습니다.");
        return;
      }


      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("startDate", startDate ? startDate.toISOString() : "");
      formData.append("endDate", endDate ? endDate.toISOString() : "");
      formData.append("link", link);
      if (selectedFilePC) {
        formData.append("pcFile", selectedFilePC);
      }

      if (selectedFileMobile) {
        formData.append("mobileFile", selectedFileMobile);
      }


      const response = await fetch("/api/banner", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "성공",
          description: "배너를 성공적으로 업로드했습니다.",
        });
        router.push('/admin/banner')
      } else {
        toast({
          title: "실패",
          description: "배너를 업로드하는데 실패했습니다.",
        });
      }
    })

  };

  return (
    <div className="flex flex-col py-10 w-full">
      <div className="p-4 xl:p-[30px] text-[#2A2A2A] text-[20px] font-bold w-full flex xl:text-[28px]">
        <span className="self-start ml-5">배너 관리</span>
      </div>
      <div className="flex items-center w-full justify-center">
        {/*테이블*/}
        <div
          className="flex flex-col border gap-[20px] p-4 xl:p-7 mx-[20px] w-full overflow-x-auto rounded-[10px] bg-white shadow-sm">
          <div className="self-start xl:pb-5 pb-3 border-b w-full flex items-center-center gap-2">
            <button className="xl:hidden" onClick={()=> {router.push('/admin/banner')}}>
              <Arrow/>
            </button>
            <span className="xl:text-[22px] text-[17px] font-semibold">배너 등록하기</span>
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
                          value={description} />
              </Label>
            </div>
            <div>
              <Label label={"PC 배너 이미지 업로드"}>
                <ImageUploadBox setSelectedFile={setSelectedFilePC}
                                selectedFile={selectedFilePC ? selectedFilePC : null} />
              </Label>
            </div>
            <div>
              <Label label={"모바일 배너 이미지 업로드"}>
                <ImageUploadBox setSelectedFile={setSelectedFileMobile} />
              </Label>
            </div>
            <div>
              <Label label={"배너 링크"}>
                <Input2 clearBtn onChange={(e) => setLink(e.target.value)} value={link} />
              </Label>
            </div>
            <div className="border-t" />

            <div className="flex justify-end gap-3">
              <Link href={'/admin/banner'}>
                <button className="border rounded-[4px] text-gray_scale-500 px-[18px] py-[10px]">
                  취소
                </button>
              </Link>
              <button className="border rounded-[4px] text-gray_scale-500 px-[18px] py-[10px]" onClick={handleUpload}>
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerUpload;