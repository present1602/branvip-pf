import Link from "next/link";
import React from "react";

interface IProps {
  title: string;
  sub: string;
  productCode: string;
}

export function AsignProductCard({ title, sub, productCode }: IProps) {
  return (
    <Link
      href={`/trademarks?product_type=${productCode}`}
      className="grid gap-1 rounded-lg bg-surface-50 px-4 py-3 text-sm font-medium transition-shadow hover:shadow"
    >
      <span className="text-surface-600">{title}</span>
      <span className="text-surface-400">{sub}</span>
    </Link>
  );
}
