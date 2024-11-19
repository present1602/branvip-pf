import { cn } from "../../lib/utils";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  helpText?: React.ReactNode;
  groupClassName?: string;
}

export function TextInput(props: TextInputProps) {
  const { helpText, className, groupClassName, ...restProps } = props;

  return (
    <div className={cn("flex flex-col gap-y-2", groupClassName)}>
      <input
        {...restProps}
        type="text"
        className={twMerge(
          "rounded bg-white p-3 text-surface-900 ring-1 ring-inset ring-surface-200",
          "placeholder:text-surface-300focus:ring-surface-400",
          "disabled:bg-surface-100 disabled:text-surface-400 disabled:ring-0 disabled:placeholder:text-surface-400",
          className
        )}
      />
      {helpText}
    </div>
  );
}
