import { create } from "zustand";

interface ILoginModalStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  callBackUrl?: string;
  setCallBackUrl: (callBackUrl: string) => void;
}

export const useLoginModalStore = create<ILoginModalStore>((set) => ({
  isOpen: false,
  callBackUrl: undefined,
  setIsOpen: (isOpen) => set({ isOpen }),
  setCallBackUrl: (callBackUrl) => set({ callBackUrl }),
}));
