import React from "react";

interface IProps {
  title: string;
  description?: string;
}

export default function Empty({ title, description }: IProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-surface-100 bg-surface-50 py-10 ">
      <p className="text-center text-xl font-bold text-surface-700">{title}</p>
      {description && (
        <p className="break-keep text-center text-surface-500">{description}</p>
      )}
    </div>
  );
}
