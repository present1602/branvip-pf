import React, { FC, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholderText?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: any;
    name?: string;
}

const SimpleInput: FC<IProps> = ({
    placeholderText,
    type = 'text',
    value,
    name,
    onChange,

}) => {
    return (
        <div className={`border border-gray_scale-90 rounded-[4px] pl-3 py-[14px]`}>
            <input className={`text-[16px] font-sans placeholder-gray-400 text-gray_scale-800`}
                placeholder={placeholderText}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SimpleInput;