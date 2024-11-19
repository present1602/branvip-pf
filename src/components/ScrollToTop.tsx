"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function ScrollToTop() {
  const pathName = usePathname();

  React.useEffect(() => {
    scrollTo(0, 0);
  }, [pathName]);

  return null;
}
