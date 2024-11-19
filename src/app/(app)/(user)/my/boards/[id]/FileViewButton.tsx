"use client";

import { FileDuplicate } from "@/components/svg";

interface IProps {
    file: any;
}
export default function FileViewButton({ file }: IProps) {
    const openImageFile = (url: string) => {
        window.open(url, '_blank');
    }
    return (
        <button
            onClick={() => openImageFile(file.imageUrl)}
        >
            <div className="body2-medium text-gray_sc ale-700 flex w-fit  max-w-[335px] gap-1 truncate whitespace-nowrap rounded-[4px] border px-2 xl:max-w-full cursor-pointer">
                <div className="flex items-center gap-2">
                    <FileDuplicate />
                    {file.fileName}
                </div>
            </div>
        </button>

    );
}