"use client";

import React from "react";
import LoginImage from "../assets/login.svg";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Dialog, DialogContent } from "./ui/dialog";
import { SocialLoginButton } from "./ui";
import { useLoginModalStore } from "@/hooks/loginModal.store";

export function LoginModal() {
  const { isOpen, callBackUrl, setIsOpen } = useLoginModalStore();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogContent className="grid gap-6">
        <div className="grid justify-center gap-6 py-6">
          <div className="flex justify-center">
            <Image src={LoginImage} alt="login" />
          </div>
          <p className="text-center text-xl font-bold text-surface-700">
            간편하게 로그인하고
            <br />
            브랜빕의 서비스를 이용해 보세요
          </p>
        </div>
        <SocialLoginButton
          provider="kakao"
          size="lg"
          onClick={() => {
            signIn("kakao", {
              callbackUrl: callBackUrl,
            });
          }}
        />
        <SocialLoginButton
          provider="naver"
          size="lg"
          onClick={() => {
            signIn("naver", {
              callbackUrl: callBackUrl,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}