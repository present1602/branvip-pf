"use client";

import React from "react";
import { LoginButton } from "./LoginButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui";
import { usePathname } from "next/navigation";

export function CtaButtons() {
  const session = useSession();
  const pathName = usePathname();
  // const isContact = pathName.includes("/contact");

  // if (isContact) return null;

  if (session.status === "authenticated") {
    return (
      <Link href="/contact/init">
        <Button size="md" className="max-pc:px-3 max-pc:py-2 max-pc:text-sm">
          의뢰하기
        </Button>
      </Link>
    );
  }

  return <LoginButton />;
}
