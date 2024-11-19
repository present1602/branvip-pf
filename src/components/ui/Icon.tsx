import React from "react";
import * as solidIcon from "@heroicons/react/24/solid";
import * as outlineIcon from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

interface IconProps {
  name: keyof typeof solidIcon | keyof typeof outlineIcon;
  size?: "sm" | "md" | "lg";
  solid?: boolean;
  className?: string;
}

export function Icon({ size = "sm", ...props }: IconProps) {
  const { name, solid, className } = props;

  const sizeClass = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const CustomIcon = solid ? solidIcon[name] : outlineIcon[name];

  return (
    <CustomIcon
      className={twMerge("text-inherit", className)}
      width={sizeClass[size]}
      height={sizeClass[size]}
    />
  );
}
