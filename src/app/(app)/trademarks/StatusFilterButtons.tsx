"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useTrademarksLoading } from "@/hooks/trademarksLoading.store";

interface IRoute {
  route:string;
}

export function   StatusFilterButtons({route}:IRoute) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const statusList = ["전체", "출원", "공고", "등록", "거절", "기타"];
  const [status, setStatus] = React.useState(
    searchParams ? searchParams.get("status") ?? "전체" : "",
  );
  const { setIsLoading } = useTrademarksLoading();


  React.useEffect(() => {
    setStatus(searchParams ? searchParams.get("status") ?? "전체" : "");
  }, [searchParams]);

  function onChange(newValue: string) {
    setIsLoading(false)
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    if (!newValue) {
      params.delete("status");
      params.delete("offset");
      setStatus("전체");
    } else {
      params.set("status", newValue);
      params.delete("offset");
      setStatus(newValue);
    }
    router.push(`/${route}?` + params);
    return;
  }

  return (
    <div className="flex min-w-fit overflow-hidden whitespace-nowrap rounded-xl border border-primary-500">
      {statusList.map((item) => {
        const isActive = item === status;
        return (

          <button
            key={item}
            className={cn(
              "p-3 text-center text-sm font-medium text-surface-500",
              isActive && "bg-primary-50 text-primary-500"
            )}
            onClick={() => {
              onChange(isActive ? "" : item);
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
