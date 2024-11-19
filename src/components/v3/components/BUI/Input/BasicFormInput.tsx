import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface IBasicFormInput {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    type?: string;
    value?: any;
}

const BasicFormInput: FC<IBasicFormInput> = (props) => {
    const { placeholder, className, inputClassName, value, onChange, type = 'text', ...restProps } = props
    return (
        <div className={twMerge("border border-gray_scale-90 rounded py-3 px-2 my-[6px]", className)}>
            <input
                {...restProps}
                onChange={onChange}
                className={twMerge("", inputClassName)}
                placeholder={placeholder}
                type={type}
                value={value}
            />
        </div>
    )
}

export default BasicFormInput;