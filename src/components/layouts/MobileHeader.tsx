import React from "react";
import { Logo } from "../ui/Logo";
import { MobileLeftDrawer } from "./MobileLeftDrawer";
import { MobileBackButton } from "./MobileBackButton";
import { CtaButtons } from "./CtaButtons";

interface IMobileHeaderProps {
  useMobileBackButton?: boolean;
}

export function MobileHeader({ useMobileBackButton }: IMobileHeaderProps) {
  return (
    <div className="flex h-14 items-center justify-between p-4 pc:hidden">
      <div className="flex gap-4">
        {useMobileBackButton ? <MobileBackButton /> : <MobileLeftDrawer />}
        <Logo className="h-6 w-full" />
      </div>
      <div className="">
        <CtaButtons />
      </div>
    </div>
  );
}
