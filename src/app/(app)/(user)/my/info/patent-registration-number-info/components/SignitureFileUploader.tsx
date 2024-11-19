"use client";

import { Icon, ImageUploader } from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import { useApplicantStore, useCompanyApplicantStore } from "@/hooks/applicant.store";
import { uploadImage } from "@/utils/upload-image";
import { ApplicantType } from "@prisma/client";
import Image from "next/image";
import React from "react";


function useConditionalStore(type: ApplicantType) {
  const companyStore = useCompanyApplicantStore();
  const individualStore = useApplicantStore();

  if (type === ApplicantType.COMPANY) {
    return companyStore;
  } else if (type === ApplicantType.INDIVIDUAL) {
    return individualStore;
  } else {
    throw new Error("Unknown applicant type");
  }
}


export function FileUploader({ type = ApplicantType.INDIVIDUAL }: { type?: ApplicantType }) {

  const [isUploading, setIsUploading] = React.useState(false);
  const store = useConditionalStore(type)

  // if (type === ApplicantType.INDIVIDUAL) {
  //   store = useApplicantStore();
  // } else if (type === ApplicantType.COMPANY) {
  //   store = useCompanyApplicantStore();
  // } else {
  //   throw new Error("Unknown applicant type");
  // }

  const { applicant, isEditing, setApplicant } = store;

  const { toast } = useToast();
  const signatureUrl = applicant?.signatureUrl;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setIsUploading(true);

    const result = await uploadImage(file);

    if (!result) {
      toast({
        title: "이미지 업로드에 실패했습니다.",
        variant: "destructive",
      });
      return;
    }


    setIsUploading(false);
    setApplicant({ ...applicant, signatureUrl: result });
  };

  const handleDelete = () => {
    const confirmed = confirm("서명 이미지를 삭제하시겠습니까?");
    if (!confirmed) return;

    setApplicant({ ...applicant, signatureUrl: undefined });
  };

  if (signatureUrl) {
    return (
      <div className="flex justify-center rounded-2xl bg-white p-4">
        <div className="relative flex h-[200px] w-[200px] items-center justify-center">
          <Image
            src={signatureUrl}
            alt="서명 이미지"
            width={200}
            height={200}
            objectFit="contain"
          />

          {/* {isEditing && ( */}
          <div className="absolute right-2 top-2">
            <button
              className="rounded-md bg-black bg-opacity-70 p-1 text-white hover:bg-opacity-90"
              onClick={handleDelete}
            >
              <Icon name="XMarkIcon" size="md" />
            </button>
          </div>
          {/* )} */}
        </div>
      </div>
    );
  }

  return <ImageUploader onChange={handleUpload} loading={isUploading} />;
}
