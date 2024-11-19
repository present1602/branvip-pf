import FilterComboBox from "../../../components/FilterComboBox";
import { labelService } from "@/services/label.service";
import React from "react";

export async function ColorFilterDropdown() {
  const colors = await labelService.getAllColors();
  const options = colors.map((color) => ({
    label: color.title ?? "",
    value: color.id.toString(),
    imageUrl: color.imageUrl ?? "",
  }));

  return (
    <div>
      <FilterComboBox
        options={options}
        initLabel="색상"
        useGrid
        gridColumns="4"
        searchParamTitle="color_id"
        route={"trademarks"}
      />
    </div>
  );
}
