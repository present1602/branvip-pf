
import React, { FC, ReactNode } from "react";
import CustomFilterComboBox from "@/components/v3/components/FilterComboBox/FilterComboBox";

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

const ColorFilter: FC<IProps> = async ({ label, icon, fontSize, type,options }) => {

  return (
    <div className={`flex shrink-0`}>
      <CustomFilterComboBox
        options={options}
        initLabel={label}
        searchParamTitle="color_id"
        route={"logosearch"}
        type={type}
        icon={icon}
      />
    </div>
  );

};


export default ColorFilter