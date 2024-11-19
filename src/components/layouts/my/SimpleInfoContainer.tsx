import { twMerge } from "tailwind-merge";

export function SimpleInfoContainer({children, className}: {children: React.ReactNode, className?: string} ){
    return (
        <div className={twMerge("flex flex-col items-center justify-center bg-primary_colorless-20 border rounded-xl border-gray-90", className) } >
            {children}
        </div>
    )
}