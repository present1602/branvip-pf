"use client"

import { Button } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"

interface IProps {
    className?: string,
    children: React.ReactNode,
    onClick?: () => void,
    isPrimary?: boolean,
    isBorderPrimary?: boolean,
    isTextPrimary?: boolean
}

const BasicUIButton = ({ className, children, isBorderPrimary = false, isTextPrimary = false, isPrimary = false, onClick }: IProps) => {

    const primaryColorStyle = "bg-primary_scale-70 text-white"
    const basicStyle = "bg-white text-gray_scale-400 border"

    return (
        <button className={twMerge("flex items-center justify-center px-[18px] py-[10px] rounded",
            isPrimary ? primaryColorStyle : basicStyle,
            isBorderPrimary && "border-primary_scale-70",
            isTextPrimary && "text-primary_scale-70",
            className)}
            onClick={onClick}
        >
            {children}
        </button>
    )

}

export default BasicUIButton