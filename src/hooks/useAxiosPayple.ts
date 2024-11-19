"use client";

import { create } from "zustand";

declare global {
  interface Window {
    PaypleCpayAuthCheck: any;
  }
}

interface AxiosPaypleStore {
  requestAxiosPayple: (obj: {
    PCD_CARD_VER: string;
    PCD_PAY_TYPE: string;
    PCD_PAY_GOODS: string;
    PCD_PAY_TAXTOTAL: number;
    PCD_PAYER_HP: string;
    PCD_PAY_WORK: string;
    PCD_PAY_ISTAX: string;
    PCD_RST_URL: string;
    PCD_PAY_TOTAL: number;
    clientKey: string;
    PCD_PAYER_EMAIL: string;
    PCD_PAYER_NAME: string;
    callbackFunction: any;
  }, callbackFunction: any) => Promise<AxiosPaypleStore>
}

export const useAxiosPayple =
  create<AxiosPaypleStore>(() => ({

    requestAxiosPayple: (obj,callbackFunction) => {
      obj.callbackFunction = callbackFunction;
      if (typeof window !== "undefined" && window.PaypleCpayAuthCheck) {
        return window.PaypleCpayAuthCheck(obj);
      }
    }

  }));
