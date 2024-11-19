import React from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  content: string;
  size?: "sm" | "md" | "lg";
  outline?: boolean;
  className?: string;
}

export default function Badge({ size = "sm", ...props }: BadgeProps) {
  const { content, outline, className } = props;

  const sizeClass = {
    sm: "px-2.5 py-0.5 text-sm",
    md: "px-3 py-1",
    lg: "px-4 py-2",
  }[size];

  const variantClass = {
    fill: "bg-primary-500 text-white",
    outline: "ring-1 ring-inset bg-white text-primary-500 ring-primary-500",
  };

  return (
    <span
      className={twMerge(
        "rounded-full font-medium",
        sizeClass,
        outline ? variantClass.outline : variantClass.fill,
        className
      )}
    >
      {content}
    </span>
  );
}
