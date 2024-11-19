"use client";

import React, { useRef } from "react";
import { Icon } from "./Icon";

interface ImageUploaderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onDrop?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  loading?: boolean;
}

// 참조
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop

/*
  내부 로직이 많아서 구조를 개편할 예정
  Image Uploader -> UploadBox
                 -> UploadCard
  하위 컴포넌트의 ref를 참조하여 value로 FileList 관리
*/

export default function ImageUploader(props: ImageUploaderProps) {
  const { onDrop, onDragOver, onClick, onChange, loading } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectFile = (e: React.MouseEvent<HTMLDivElement>) => {
    fileInputRef.current?.click();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className="flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-surface-300 bg-white p-10"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={selectFile}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={onChange}
        disabled={loading}
        accept="image/*"
      />
      <div className="flex flex-col items-center gap-y-2 text-surface-300">
        <Icon name="CloudArrowUpIcon" className="h-14 w-14" />
        <div className="font-bold">
          {loading ? "업로드 중..." : "이미지 업로드"}
        </div>
      </div>
    </div>
  );
}
