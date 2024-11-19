import React from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";

interface AccordionProps extends React.HTMLAttributes<HTMLDetailsElement> {
  title: string;
  children: React.ReactNode;
  outline?: boolean;
}

export function Accordion(props: AccordionProps) {
  const { title, children, outline, className, ...restProps } = props;

  return (
    <details
      {...restProps}
      className={twMerge(
        "group cursor-pointer rounded-2xl bg-white p-4",
        outline && "ring-1 ring-inset ring-surface-200",
        className
      )}
    >
      <summary className="flex list-none items-center justify-between gap-x-4">
        <div>{title}</div>
        <Icon
          name="ChevronDownIcon"
          size="lg"
          className="text-surface-800 transition-all group-open:rotate-180"
        />
      </summary>
      <p className="mt-2 text-surface-400">{children}</p>
    </details>
  );
}
