import { twMerge } from "tailwind-merge";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function Toggle(props: ToggleProps) {
  const { selected, disabled, ...restProps } = props;

  return (
    <button
      {...restProps}
      disabled={disabled}
      className={twMerge(
        "group flex h-8 w-14 rounded-full bg-surface-400 p-1 disabled:bg-surface-100",
        selected && "justify-end bg-primary-500"
      )}
    >
      <div className="h-6 w-6 rounded-full bg-white group-disabled:bg-surface-400" />
    </button>
  );
}
