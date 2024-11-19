import { twMerge } from "tailwind-merge";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  helpText?: React.ReactNode;
}

export function TextArea(props: TextAreaProps) {
  const { helpText, rows, ...restProps } = props;

  return (
    <div className="flex flex-col gap-y-2">
      <textarea
        {...restProps}
        rows={rows || 5}
        className={twMerge(
          "resize-none rounded-2xl bg-white p-4 text-surface-900 ring-1 ring-inset ring-surface-200",
          "placeholder:text-surface-300 focus:ring-surface-400",
          "disabled:bg-surface-100 disabled:text-surface-400 disabled:ring-0 disabled:placeholder:text-surface-400"
        )}
      />
      {helpText}
    </div>
  );
}
