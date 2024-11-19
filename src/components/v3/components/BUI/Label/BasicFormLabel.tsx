import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface IBasicLabelProps {
    labelText: string;
    className?: string;
    required?: Boolean;
    children?: React.ReactNode
}

const BasicFormLabel: FC<IBasicLabelProps> = ({ labelText, className, required, children }: IBasicLabelProps) => {
    return (
        <div className={twMerge('body2-semibold text-gray-600', className)}>
            {labelText}
            {
                required &&
                (
                    <span className="text-red-[#CC0033]">*</span>
                )
            }
            {children}
        </div>
    )
}

export default BasicFormLabel