"use client";

import React from "react";
import { Icon } from "../ui";
import { useRouter } from "next/navigation";

export function MobileBackButton() {
  const router = useRouter();

  function onClick() {
    router.back();
  }

  return (
    <button className="text-surface-700" onClick={onClick}>
      <Icon name="ArrowLeftIcon" size="lg" />
    </button>
  );
}
