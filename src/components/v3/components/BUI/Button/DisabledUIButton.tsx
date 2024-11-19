import { twMerge } from "tailwind-merge"

interface IProps {
    className?: string
    buttonText: string   
}

const DisabledUIButton = ({className, buttonText}: IProps) => {
    return ( 
        <div className={twMerge("flex items-center justify-center bg-gray_scale-50 text-warm_gray_scale-30", className)}>
            {buttonText}
        </div>
    )
}

export default DisabledUIButton