"use client";

import { GhostButton } from "@/components/ui";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";


interface IRoute {
  route: string;
}

export function RefreshButton({ route }: IRoute) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(
    searchParams ? searchParams.get("keyword") : "",
  );

  useEffect(() => {
    setKeyword(searchParams ? searchParams.get("keyword") : "");
  }, [keyword, searchParams]);


  function onClick() {
    if (route === "search") {
      router.replace(`/${route}?keyword=${keyword}`);
      router.refresh();
    }else{
      router.replace(`/${route}`);
      router.refresh();
    }
  }

  return <GhostButton onClick={onClick}>필터 초기화</GhostButton>;
}
