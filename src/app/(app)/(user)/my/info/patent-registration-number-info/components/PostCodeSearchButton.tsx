"use client";

import { Button } from "@/components/ui";
import { useApplicantStore, useCompanyApplicantStore } from "@/hooks/applicant.store";
import React from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { ApplicantType } from "@prisma/client";


// let store;
// if (type === ApplicantType.INDIVIDUAL) {
//   store = useApplicantStore();
// } else if (type === ApplicantType.COMPANY) {
//   store = useCompanyApplicantStore();
// } else {
//   throw new Error("Unknown applicant type");
// }
// const applicantStore = useApplicantStore();
// const companyApplicantStore = useCompanyApplicantStore();
// const store = type === ApplicantType.COMPANY ? companyApplicantStore : applicantStore;

// function useConditionaStore(type: ApplicantType) {
//   if (type === ApplicantType.COMPANY) {
//     return useCompanyApplicantStore();
//   } else if (type === ApplicantType.INDIVIDUAL) {
//     return useApplicantStore();
//   } else {
//     throw new Error("Unknown applicant type");
//   }
// }

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



export function PostCodeSearchButton({ type = ApplicantType.INDIVIDUAL }: { type?: ApplicantType }) {
  const store = useConditionalStore(type)

  const { applicant, setApplicant } = store;

  const open = useDaumPostcodePopup();

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setApplicant({
      ...applicant,
      address: fullAddress,
      addressPostCode: data.zonecode,
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  return (
    <Button
      size="md"
      outline
      onClick={handleClick}
      className="whitespace-nowrap"
    >
      주소 찾기
    </Button>
  );
}
