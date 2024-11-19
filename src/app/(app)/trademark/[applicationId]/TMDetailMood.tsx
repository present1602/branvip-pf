"use client";

import Chip from "@/components/v3/components/BUI/Chip/Chip";
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { TMProps } from "@/app/(app)/trademark/[applicationId]/TMInfo";

const TMDetailMood: FC<TMProps> = ({ tm }) => {
  const router = useRouter();

  return (
    <div className="flex xl:gap-2">
      <span className="w-[80px] text-[14px] text-gray-600 xl:text-[15px] xl:font-semibold xl:text-gray_scale-500">
        분위기
      </span>
      <span className="text-[14px] xl:text-[15px] xl:font-semibold">
        {tm.moods && tm.moods.length > 0 && (
          <>
            <div className="flex gap-2">
              {tm.moods.map((mood: any, index: number) => (
                <Chip
                  key={index}
                  type={"mood"}
                  text={mood.title ?? ""}
                  image={mood.imageUrl ?? ""}
                  onClick={() => {
                    router.push(`/logosearch?mood_id=${mood.id}`);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </span>
    </div>
  );
};

export default TMDetailMood;
