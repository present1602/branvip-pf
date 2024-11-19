"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

export default function NextProvider({ children }: { children: ReactNode}) {
  return <NextUIProvider>
    {children}
  </NextUIProvider>;
}