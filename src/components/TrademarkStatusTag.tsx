import { cn } from "../lib/utils";
import { formatTrademarkStatus } from "../utils/formatters";
import React from "react";

export default function TrademarkStatusTag({ status = "" }) {
  const statusString = formatTrademarkStatus(status);

  return (
    <div
      className={cn(
        "w-fit rounded-lg bg-surface-100 px-2 py-1 text-sm font-medium text-surface-500",
        statusString === "등록" && "bg-green-50 text-green-700",
        statusString === "거절" && "bg-red-50 text-red-500"
      )}
    >
      {statusString}
    </div>
  );
}
