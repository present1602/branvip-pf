import FilterComboBox from "../../../components/FilterComboBox";
import { labelService } from "@/services/label.service";
import React from "react";

export async function MoodFilterDropdown() {
  const moods = await labelService.getAllMoods();
  const options = moods.map((mood) => ({
    label: mood.title ?? "",
    value: mood.id.toString(),
    imageUrl: mood.imageUrl ?? "",
  }));

  return (
    <div>
      <FilterComboBox
        options={options}
        initLabel="분위기"
        useGrid
        gridColumns="5"
        searchParamTitle="mood_id"
        route={"trademarks"}
      />
    </div>
  );
}
