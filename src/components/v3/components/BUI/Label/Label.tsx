import React, { FC, ReactNode } from "react";

export interface ILabelProps {
  label: string;
  require?: boolean;
  children: ReactNode;
  description? :string;
}
const Label:FC<ILabelProps> = ({label,require,children, description, ...props}) => {
  return(
    <div>
      <div className={"pointer-events-none flex flex-col"}>
        <div className="flex gap-1">
          <span className="text-[16px] font-sans text-gray_scale-600">{label}</span>
          {require && (
            <span className="text-[16px] text-system-d-red">*</span>
          )}
        </div>
        {description && (
          <div className="whitespace-pre-line text-sm text-surface-400">
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export default Label