import React from "react";
import { Icon } from "./Icon";

interface UploadCardProps {
  name: string;
  bytes?: number;
  uploading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function UploadCard({ bytes = 0, ...props }: UploadCardProps) {
  const { name, uploading, onClick } = props;

  const convertBytesToSize = (b: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (b === 0) return "0 Byte";

    const i = Math.floor(Math.log(b) / Math.log(1024));
    const convertedValue = parseFloat((b / Math.pow(1024, i)).toFixed(2));

    return convertedValue + " " + sizes[i];
  };

  return (
    <div className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-white px-4 py-2">
      <div
        className="text-sm text-surface-900 data-[uploading=true]:animate-pulse data-[uploading=true]:text-surface-400"
        data-uploading={uploading}
      >
        <div className="font-bold">{name}</div>
        <div className="font-medium">{convertBytesToSize(bytes)}</div>
      </div>
      {!uploading && (
        <button
          className="text-surface-300 group-hover:text-surface-900"
          onClick={onClick}
        >
          <Icon name="XMarkIcon" size="lg" />
        </button>
      )}
      {/* {uploading && (
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500 transition-all"></div>
      )} */}
    </div>
  );
}
