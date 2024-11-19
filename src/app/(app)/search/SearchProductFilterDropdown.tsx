import FilterComboBox from "../../../components/FilterComboBox";
import { productTypeService } from "@/services/product-type.service";
import React from "react";

interface IProductType {
  code: string;
  title: string;
  isShown: boolean;
}
export async function SearchProductFilterDropdown() {
  const productTypes: IProductType[] =
    await productTypeService.getAllProductTypes();
  const options = productTypes.map((productType) => ({
    label: productType.title,
    value: productType.code,
  }));

  return (
    <div>
      <FilterComboBox
        initLabel="업종"
        searchParamTitle="product_type"
        useSearch
        options={options}
        route={"search"}
      ></FilterComboBox>
    </div>
  );
}
