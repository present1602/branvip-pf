import React, { cloneElement } from "react";
import { twMerge } from "tailwind-merge";
import { LoadingIndicator } from "./LoadingIndicator";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  outline?: boolean;
  iconOnly?: boolean;
  isLoading?: boolean;
}

export function Button({ size = "sm", outline, ...props }: ButtonProps) {
  const {
    leftIcon,
    rightIcon,
    children,
    iconOnly,
    className,
    disabled,
    isLoading,
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
    sm: {
      default: "px-3 py-2 text-sm gap-x-1",
      icon: "p-2.5 rounded-full",
      content: "px-1",
    },
    md: {
      default: "px-4 py-3 text-base gap-x-2",
      icon: "p-3",
      content: "px-2",
    },
    lg: { default: "p-4 text-xl gap-x-3", icon: "p-3.5", content: "px-3" },
  };
  const variantClass = {
    solid:
      "bg-primary-700 text-white hover:bg-primary-800 disabled:bg-surface-100 disabled:text-surface-300",
    outline:
      "bg-white text-surface-600 ring-1 ring-inset ring-surface-400 hover:bg-surface-50 disabled:bg-surface-200 disabled:ring-surface-50 disabled:text-surface-300",
  };

  if (iconOnly) {
    return (
      <button
        {...restProps}
        className={twMerge(
          "flex items-center justify-center rounded-2xl",
          outline ? variantClass.outline : variantClass.solid,
          sizeClass[size].icon,
          className
        )}
      >
        <LeftIcon />
      </button>
    );
  }

  return (
    <button
      {...restProps}
      disabled={disabled || isLoading}
      className={twMerge(
        "relative flex items-center justify-center rounded-lg font-bold",
        outline ? variantClass.outline : variantClass.solid,
        sizeClass[size].default,
        className
      )}
    >
      <LeftIcon />
      <div
        className={twMerge(sizeClass[size].content, isLoading && "invisible")}
      >
        {children}
      </div>
      <RightIcon />
      {isLoading && (
        <LoadingIndicator className="absolute h-6 w-6 opacity-30" />
      )}
    </button>
  );
}
