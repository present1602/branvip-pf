"use client";

import { Button } from "@/components/ui";
import { useApplicantStore } from "@/hooks/applicant.store";
import React from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";

export function PostCodeSearchButton() {
  const { applicant, setApplicant } = useApplicantStore();

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
