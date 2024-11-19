"use client";

import { FileDuplicate, IconUpload } from "@/components/svg";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUploadLogoStore } from "@/hooks/uploadLogo.store";
import { uploadImage } from "@/utils/upload-image";
import { formatFileSize } from "@/utils/formatters";

const ImagesUploadBox: React.FC = ({}) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { files, addFile, removeFile, clearFiles } = useUploadLogoStore();
  const { toast } = useToast();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileRemove = (fileName: string) => {
    const result = confirm("이미지를 삭제하시겠습니까?");
    if (result) {
      removeFile(fileName);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    setLoading(true);
    toast({
      title: "이미지 업로드 중입니다",
      description: "잠시만 기다려주세요",
    });
    if (files.length >= 3) {
      return toast({
        title: "이미지는 최대 3개까지 업로드 가능합니다",
        variant: "destructive",
      });
    }
    if (
      files.some((file) => file.fileName === event.target.files?.[0]?.name) &&
      files.some(
        (file) =>
          file.fileSize === formatFileSize(event.target.files?.[0]?.size || 0)
      )
    ) {
      return toast({
        title: "동일한 파일을 업로드 할 수 없습니다",
        variant: "destructive",
      });
    }
    const result = await handleImageUpload(event.target.files[0]);

    if (typeof result === "string") {
      const file = {
        fileName: event.target.files[0].name,
        fileSize: formatFileSize(event.target.files[0].size),
        imageUrl: result,
        previewImage: result,
      };
      addFile(file);
    } else {
    }
  };

  const handleImageUpload = async (file: File) => {
    const result = await uploadImage(file);

    setLoading(false);

    if (!result) {
      return toast({
        title: "이미지 업로드에 실패했습니다",
        description: "10MB 이하의 이미지를 올려주세요",
        variant: "destructive",
      });
    }
    return result;
  };

  return (
    <div className="grid gap-4">
      <div className="hidden min-h-[130px] min-w-[900px] rounded-[4px] border border-gray_scale-200 bg-gray_scale-20 xl:inline">
        <button className="h-full w-full" onClick={handleButtonClick}>
          <div className="flex flex-col items-center justify-center">
            <IconUpload />
            <span className="text2-medium text-gray_scale-200">파일추가</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </button>
      </div>
      <div className="xl:hidden">
        <div
          className="w-[335px] rounded-[4px] border border-gray_scale-70 bg-white py-[10px]"
          onClick={handleButtonClick}
        >
          <div className="text2-bold text-primary_scale-70">+ 파일추가</div>
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-2">
        {files?.map((file, index) => (
          <button
            key={index}
            className="body2-medium text-gray_sc ale-700 flex w-fit  max-w-[335px] gap-1 truncate whitespace-nowrap rounded-[4px] border px-2 xl:max-w-full"
            onClick={() => handleFileRemove(file.fileName)}
          >
            <div className="flex items-center justify-center gap-2">
              <FileDuplicate />
              {file.fileSize == undefined
                ? "이미지 변경하기"
                : `${file.fileName} (${file.fileSize})`}
              <div> X</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImagesUploadBox;
