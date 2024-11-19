import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoImage from "../../assets/logo.png";
import { cn } from "../../lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex items-start">
      <Image
        src={LogoImage}
        alt="로고"
        width={142}
        height={24}
        className={cn(
          "max-pc:h-6 max-pc:w-[85px] pc:h-10 pc:w-[142px]",
          className
        )}
      />
    </Link>
  );
}
