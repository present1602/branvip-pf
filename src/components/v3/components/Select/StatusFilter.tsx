import React, { FC, ReactNode } from "react";
import CustomFilterComboBox from "@/components/v3/components/FilterComboBox/FilterComboBox";

export interface ItemsProps {
  title: string;
  value: string;
}

interface IProps {
  label: string;
  icon?: ReactNode;
  fontSize?: number;
  type?: string;
}

const StatusFilter: FC<IProps> = ({ label, icon, fontSize, type }) => {

  const options = [
    {
      label: "등록",
      value: "등록",
    },
    {
      label: "출원",
      value: "출원",
    },
    {
      label: "기타",
      value: "기타",
    },
    {
      label: "공고",
      value: "공고",
    },    {
      label: "거절",
      value: "거절",
    },
  ];


  return (
    <div className={`flex shrink-0`}>
      <CustomFilterComboBox
        options={options}
        initLabel={label}
        searchParamTitle="status"
        route={"logosearch"}
        type={type}
        icon={icon}
      />
    </div>
  );

};


export default StatusFilter;