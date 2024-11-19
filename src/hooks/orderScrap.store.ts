import { create } from "zustand";

interface ITrademark {
  applicationNumber: string;
  imageUrl: string;
}

interface IOrderScrapStore {
  trademarks: ITrademark[];
  setTrademarks: (trademarks: ITrademark[]) => void;
  removeTrademark: (applicationNumber: string) => void;
}

export const useOrderScrapStore = create<IOrderScrapStore>((set) => ({
  trademarks: [],
  setTrademarks: (trademarks) => set({ trademarks }),

  removeTrademark: (applicationNumber: string) =>
    set((state) => ({
      trademarks: state.trademarks.filter(
        (t) => t.applicationNumber !== applicationNumber
      ),
    })),
}));
