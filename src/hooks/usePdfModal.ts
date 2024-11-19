import { create } from "zustand";

interface IPdfModalStore {
  pdfUrl: string;
  setPdfUrl: (url: string) => void;

  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const usePdfModal = create<IPdfModalStore>((set) => ({
  pdfUrl: "",
  setPdfUrl: (url) => set({ pdfUrl: url }),

  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
