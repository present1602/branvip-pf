import FilterComboBox from "../../../components/FilterComboBox";
import { productTypeService } from "@/services/product-type.service";
import React from "react";

export async function ProductFilterDropdown() {
  const productTypes = await productTypeService.getAllProductTypes();
  const options: { label: string; value: string }[] = productTypes.map(
    (productType) => ({
      label: productType.title,
      value: productType.code,
    })
  );

  return (
    <div>
      <FilterComboBox
        initLabel="업종"
        searchParamTitle="product_type"
        useSearch
        options={options}
        route={"trademarks"}
      ></FilterComboBox>
    </div>
  );
}
