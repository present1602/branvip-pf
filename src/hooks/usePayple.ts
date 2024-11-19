"use client";

import { RegisterPaypleCard } from "@/interfaces/payple.interface";
import { create } from "zustand";

declare global {
  interface Window {
    PaypleCpayAuthCheck: any;
  }
}

interface PaypleStore {
  register: RegisterPaypleCard;
  setPayerName: (payerName: string) => void;
  setPayerEmail: (payerEmail: string) => void;
  setCallbackFunction: (callbackFunction: any) => void;

  requestPaypleCard: () => void;
}

export const usePayple = create<PaypleStore>((set) => ({
  register: {
    PCD_PAY_TYPE: "card",
    PCD_PAY_WORK: "AUTH",
    PCD_CARD_VER: "01",
    PCD_PAYER_NAME: "",
    PCD_PAYER_EMAIL: "",
    clientKey: process.env.NEXT_PUBLIC_PAYPLE_CLIENT_KEY || "",
    PCD_RST_URL: "/contact/complete",
  },
  setPayerName: (payerName: string) =>
    set((state) => ({
      register: { ...state.register, PCD_PAYER_NAME: payerName },
    })),
  setPayerEmail: (payerEmail: string) =>
    set((state) => ({
      register: { ...state.register, PCD_PAYER_EMAIL: payerEmail },
    })),
  setCallbackFunction: (callbackFunction: any) =>
    set((state) => ({
      register: { ...state.register, callbackFunction },
    })),

  requestPaypleCard: () => {
    if (typeof window === "undefined") return [];

    if (!window?.PaypleCpayAuthCheck) {
      alert("페이플 결제 모듈이 로드되지 않았습니다.");
      return;
    }

    const { register } = usePayple.getState();

    window.PaypleCpayAuthCheck(register);
  },
}));
