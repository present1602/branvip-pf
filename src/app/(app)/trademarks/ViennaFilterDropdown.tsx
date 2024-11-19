import FilterComboBox from "../../../components/FilterComboBox";
import { viennaService } from "@/services/vienna.service";
import React from "react";

export async function ViennaFilterDropdown() {
  const codes = await viennaService.getAllViennaCodes();
  const options: { label: string; value: string }[] = codes.map((code) => ({
    label: code.title ?? "",
    value: code.code,
  }));

  return (
    <div>
      <FilterComboBox
        options={options}
        initLabel="상표 모양"
        searchParamTitle="vienna_code"
        useSearch
        route={"trademarks"}
      />
    </div>
  );
}
