import { cloneElement } from "react";
import { twMerge } from "tailwind-merge";

interface GhostButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  iconOnly?: boolean;
  underline?: boolean;
}

export function GhostButton({ size = "sm", ...props }: GhostButtonProps) {
  const {
    leftIcon,
    rightIcon,
    children,
    underline,
    iconOnly,
    className,
    ...restProps
  } = props;

  const LeftIcon = () =>
    leftIcon
      ? cloneElement(leftIcon, {
          size,
        })
      : null;
  const RightIcon = () =>
    rightIcon ? cloneElement(rightIcon, { size }) : null;

  const sizeClass = {
    sm: "text-sm gap-x-1",
    md: "text-base gap-x-2",
    lg: "text-lg gap-x-3",
  };

  return (
    <button
      {...restProps}
      className={twMerge(
        "flex items-center justify-center font-medium text-surface-500 hover:text-surface-900 disabled:text-surface-300",
        underline && "underline",
        sizeClass[size],
        className
      )}
    >
      <LeftIcon />
      {!iconOnly && children}
      {!iconOnly && <RightIcon />}
    </button>
  );
}
