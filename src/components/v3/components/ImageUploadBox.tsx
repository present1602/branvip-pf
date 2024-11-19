"use client";

import Image from "next/image";
import { FileDuplicate, IconUpload } from "@/components/svg";
import React, { FC, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { formatFileSize } from "@/utils/formatters";

interface IProps {
  selectedFile?: File | null;
  setSelectedFile: (file: File | null) => void;
  previewImg?: string;
}

const ImageUploadBox: FC<IProps> = ({
  setSelectedFile,
  previewImg,
  selectedFile,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    previewImg ? previewImg : null
  );
  const [fileName, setFileName] = useState<string>("Upload File");
  const [fileSize, setFileSize] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileRemove = () => {
    const result = confirm("이미지를 삭제하시겠습니까?");
    if (result) {
      setSelectedFile(null);
      setFileName("Upload File");
      setFileSize(undefined);
      setPreviewUrl(null);
      alert("이미지가 삭제되었습니다.");
    } else {
      alert("취소 되었습니다");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    toast({
      title: "이미지 업로드 중입니다",
      description: "잠시만 기다려주세요",
    });
    const file = event.target.files?.[0];
    setSelectedFile(file);
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));
    // 미리보기 URL 생성
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  return (
    <div className="grid gap-4">
      <div className="min-h-[164px] rounded-[4px] border">
        {previewUrl ? (
          <div className="flex h-full w-full items-center justify-center">
            <Image src={previewUrl} alt="Preview" width={1000} height={200} />
          </div>
        ) : (
          <button className="h-full w-full" onClick={handleButtonClick}>
            <div className="flex flex-col items-center justify-center">
              <IconUpload />
              <span className="text-gray_scale-500">파일추가</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </button>
        )}
      </div>
      {previewUrl && (
        <div>
          <button
            className="flex gap-1 rounded-[4px] border px-4 py-3.5 text-[16px] text-gray_scale-500"
            onClick={handleFileRemove}
          >
            <FileDuplicate />{" "}
            {fileSize == undefined
              ? "이미지 변경하기"
              : `${fileName} [${fileSize}]`}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadBox;
