import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  helpText?: React.ReactNode;
  groupClassName?: string;
}

 const CustomTextInput:FC<TextInputProps> = (props: TextInputProps) => {
  const { helpText, className, groupClassName, ...restProps } = props;

  return (
    <div className={cn("flex flex-col gap-y-2", groupClassName)}>
      <input
        {...restProps}
        type="text"
        className={twMerge(
          "rounded-full bg-white px-8 py-3.5 py-text-surface-900 ring-1 ring-inset ring-surface-200 focus:border-black focus:border",
          "placeholder:text-surface-300focus:ring-surface-400 text-[15px]",
          "disabled:bg-surface-100 disabled:text-surface-400 disabled:ring-0 disabled:placeholder:text-surface-400",
          className
        )}
      />
      {helpText}
    </div>
  );
}

export default CustomTextInput