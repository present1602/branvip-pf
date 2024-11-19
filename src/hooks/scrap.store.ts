"use client";

import { create } from "zustand";

interface ITrademark {
  applicationNumber: string;
  imageUrl: string;
}

interface IScrapStore {
  trademarks: ITrademark[];
  setTrademarks: (trademarks: ITrademark[]) => void;

  modalOpened: boolean;
  setModalOpened: (modalOpened: boolean) => void;
}

const getTrademarksFromLocalStorage = (): ITrademark[] => {
  if (typeof window === "undefined") return [];
  const trademarks = window?.localStorage.getItem("trademarks") ?? null;
  if (!trademarks) return [];
  return JSON.parse(trademarks);
};

const setTrademarksToLocalStorage = (trademarks: ITrademark[]) => {
  if (typeof window === "undefined") return [];
  window?.localStorage.setItem("trademarks", JSON.stringify(trademarks));
};

export const useScrapStore = create<IScrapStore>((set) => ({
  trademarks: getTrademarksFromLocalStorage(),
  setTrademarks: (trademarks) => {
    set({ trademarks });
    setTrademarksToLocalStorage(trademarks);
  },

  modalOpened: false,
  setModalOpened: (modalOpened) => set({ modalOpened }),
}));
