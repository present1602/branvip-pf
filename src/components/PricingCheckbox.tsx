"use client";

import { Checkbox } from "./ui";
import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  title: React.ReactNode;
  children: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function PricingCheckbox({
  title,
  children,
  checked = false,
  onChange,
}: IProps) {
  function onClick() {
    onChange?.(!checked);
  }

  return (
    <button
      className={cn(
        "flex w-full cursor-pointer flex-col rounded-2xl border border-surface-100 bg-white p-6 text-start",
        checked && "border-primary-500"
      )}
      onClick={onClick}
    >
      <div className="flex h-fit w-full justify-between">
        <div>{title}</div>
        <Checkbox checked={checked} onChange={()=> null}/>
      </div>
      <div>{children}</div>
    </button>
  );
}
