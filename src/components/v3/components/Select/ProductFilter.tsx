import React, { FC, ReactNode } from "react";
import CustomFilterComboBox from "@/components/v3/components/FilterComboBox/FilterComboBox";

export interface ItemsProps {
  title: string;
  value: string;
}
interface IOption {
  label: string;
  value: string;
  parentValue?: string | null;
  imageUrl?: string;
}
interface IProps {
  label: string;
  icon?: ReactNode;
  fontSize?: number;
  type?: string;
  options: IOption[];
}

const ProductFilter: FC<IProps> = async ({ label, icon, fontSize, type,options }) => {

  return (
    <div className={`flex shrink-0`}>
      <CustomFilterComboBox
        options={options}
        initLabel={label}
        searchParamTitle="product_type"
        route={"logosearch"}
        type={type}
        icon={icon}
      />
    </div>
  );

};


export default ProductFilter