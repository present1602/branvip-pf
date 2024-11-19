"use client";

import { OrderType, Prisma } from "@prisma/client";
import { create } from "zustand";

const initialState = {
  orderType: undefined,
  order: undefined,
  aiProductTypes: [],
};
interface IReqStore {
  orderType?: OrderType;
  setOrderType: (orderType: OrderType) => void;

  order?: Partial<Prisma.OrderCreateInput>;
  setOrder: (order: Partial<Prisma.OrderCreateInput>) => void;

  aiProductTypes: string[];
  setAiProductTypes: (aiProductTypes: string[]) => void;
  deleteAiProductType: (aiProductType: string) => void;

  addSelectedMoods: (mood: string) => void;
  deleteSelectedMoods: (moods: string) => void;
  setSelectMoods: (mood: string[]) => void;
  reset: () => void;
}

export const useReqStore = create<IReqStore>((set) => ({
  orderType: undefined,

  order: undefined,
  aiProductTypes: [],

  setOrderType: (orderType) => set({ orderType }),

  setOrder: (order) => set({ order }),

  setAiProductTypes: (aiProductTypes) => {
    set((state) => ({
      order: {
        ...state.order,
        productTypeCodes: aiProductTypes,
      },
      aiProductTypes,
    }));
  },
  deleteAiProductType: (aiProductType) =>
    set((state) => ({
      aiProductTypes: state.aiProductTypes.filter(
        (type) => type !== aiProductType
      ),
      order: {
        ...state.order,
        productTypeCodes: (state?.order?.productTypeCodes as string[]).filter(
          (code) => !code.includes(aiProductType)
        ),
      },
    })),

  addSelectedMoods: (mood) =>
    set((state) => ({
      order: {
        ...state.order,
        selectedMoods: [
          ...((state.order?.selectedMoods as string[]) || []),
          mood,
        ],
      },
    })),

  deleteSelectedMoods: (moods) =>
    set((state) => ({
      order: {
        ...state.order,
        selectedMoods: (state?.order?.selectedMoods as string[]).filter(
          (mood) => !mood.includes(moods)
        ),
      },
    })),

  setSelectMoods: (moods) => {
    set((state) => ({
      order: {
        ...state.order,
        selectedMoods: moods,
      },
    }));
  },
  reset: () => set(initialState),
}));
