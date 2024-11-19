import { create } from "zustand";

interface ITrademarksLoading {
  isLoading: boolean;
  setIsLoading: (state:boolean) => void;
}

export const useTrademarksLoading = create<ITrademarksLoading>((set) => ({
  isLoading: false,
  setIsLoading: (state) => set({ isLoading: state }),
}));