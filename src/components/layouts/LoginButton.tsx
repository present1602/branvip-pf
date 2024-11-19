"use client";

import React from "react";
import { Button } from "../ui";
import { useLoginModalStore } from "../../hooks/loginModal.store";

export function LoginButton() {
  const { setIsOpen } = useLoginModalStore();

  return (
    <Button
      size="md"
      className="max-pc:px-3 max-pc:py-2 max-pc:text-sm"
      onClick={() => {
        setIsOpen(true);
      }}
    >
      로그인
    </Button>
  );
}
