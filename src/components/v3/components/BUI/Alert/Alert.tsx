import React, { FC } from "react";
import TypeIcon from "@/components/v3/components/BUI/TypeIcon/TypeIcon";

interface IAlertProps {
  size: number;
  type: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const Alert: FC<IAlertProps> = ({ size, type ,title,description,children}) => {


  const typeClasses = {
    confirmation: `bg-[#E8F3FF]`,
    success: `bg-[#E8FFEA]`,
    caution: `bg-[#FFF7E8]`,
    error: `bg-[#FFECE8]`,
    '':`bg-[#E8F3FF]`,
  };

  const AlertClasses = `px-4 rounded-[10px] ${typeClasses[type as keyof typeof typeClasses]} `;




  if (size == 1) {
    return (
      <div className={`flex items-center ${AlertClasses} py-[9px] gap-2 w-fit max-w-[400px] xl:max-w-full`}>
      <div className="flex-shrink-0 self-start pt-[2px]">
        <TypeIcon type={type}/>
      </div>
        <span className={"text-sm font-medium leading-5 font-sans text-gray_scale-700 "}>{description}</span>
      </div>
    );
  }
  if (size == 2) {
    return (
      <div className={`flex ${AlertClasses} py-4 max-w-[400px] xl:max-w-full gap-2`}>
          <div className="flex-shrink-0 self-start justify-self-start">
          <TypeIcon type={type}/>
          </div>
        {children}
      </div>
    );
  }
};

export default Alert;