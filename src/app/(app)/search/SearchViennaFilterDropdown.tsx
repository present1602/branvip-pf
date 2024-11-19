import React from "react";
import { viennaService } from "@/services/vienna.service";
import { viennaServiceV2 } from "@/services/vienna_V2.service";
import FilterComboBox from "@/components/FilterComboBox";

export async function SearchViennaFilterDropdown() {
  const codes = await viennaService.getAllViennaCodes();
  const options: { label: string; value: string }[] = codes.map((code) => ({
    label: code.title ?? "",
    value: code.code,
  }));
  const parentCode = options.map((value) => value.value);
  const childCodes = await viennaServiceV2.getAllViennaCodes(parentCode);
  const childOptions = childCodes.map((code) => ({
    label: code.title ?? "",
    value: code.code,
    parentValue: code.parentCode,
  }));

  return (
    <div>
      <FilterComboBox
        options={options}
        childOptions={childOptions}
        initLabel="상표 모양"
        searchParamTitle="vienna_code"
        useSearch
        route={"search"}
      />
    </div>
  );
}
