import React from "react";
import { Button, TextInput } from "./index";

interface AddressInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onClick"> {
  zonecode?: string;
  address?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function AddressInput(props: AddressInputProps) {
  const { zonecode, address, placeholder, value, onClick, ...restProps } =
    props;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex w-full gap-x-2">
        <TextInput
          placeholder="우편번호"
          value={zonecode}
          disabled
          className="flex-1"
        />
        <Button size="md" onClick={onClick} className="h-full">
          주소 찾기
        </Button>
      </div>
      {address && <TextInput value={address} disabled />}
      {zonecode && address && (
        <TextInput
          {...restProps}
          placeholder={placeholder || "상세주소"}
          value={value}
        />
      )}
    </div>
  );
}

// 다음 주소 검색 API 예시 데이터
// 해당 key-name에 맞춰 props 구성
const sample = {
  postcode: "",
  postcode1: "",
  postcode2: "",
  postcodeSeq: "",
  zonecode: "27465",
  address: "충북 충주시 중앙탑면 원앙4길 51",
  addressEnglish:
    "51, Wonang 4-gil, Jungangtap-myeon, Chungju-si, Chungcheongbuk-do, Korea",
  addressType: "R",
  bcode: "4313038526",
  bname: "용전리",
  bnameEnglish: "Yongjeon-ri",
  bname1: "중앙탑면",
  bname1English: "Jungangtap-myeon",
  bname2: "용전리",
  bname2English: "Yongjeon-ri",
  sido: "충북",
  sidoEnglish: "Chungcheongbuk-do",
  sigungu: "충주시",
  sigunguEnglish: "Chungju-si",
  sigunguCode: "43130",
  userLanguageType: "K",
  query: "원앙 4길 51",
  buildingName: "충주시티자이",
  buildingCode: "4313038526107210000000001",
  apartment: "Y",
  jibunAddress: "",
  jibunAddressEnglish: "",
  roadAddress: "충북 충주시 중앙탑면 원앙4길 51",
  roadAddressEnglish:
    "51, Wonang 4-gil, Jungangtap-myeon, Chungju-si, Chungcheongbuk-do, Korea",
  autoRoadAddress: "",
  autoRoadAddressEnglish: "",
  autoJibunAddress: "충북 충주시 중앙탑면 용전리 721",
  autoJibunAddressEnglish:
    "721, Yongjeon-ri, Jungangtap-myeon, Chungju-si, Chungcheongbuk-do, Korea",
  userSelectedType: "R",
  noSelected: "N",
  hname: "",
  roadnameCode: "4515559",
  roadname: "원앙4길",
  roadnameEnglish: "Wonang 4-gil",
};
