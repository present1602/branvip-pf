import { OrderType, Prisma } from "@prisma/client";
import { create } from "zustand";

interface IContactStore {
  orderType?: OrderType;
  setOrderType: (orderType: OrderType) => void;

  order?: Partial<Prisma.OrderCreateInput>;
  setOrder: (order: Partial<Prisma.OrderCreateInput>) => void;

  aiProductTypes: string[];
  setAiProductTypes: (aiProductTypes: string[]) => void;
  deleteAiProductType: (aiProductType: string) => void;

  currentType?: "design" | "application";
  setCurrentType: (type: "design" | "application") => void;
  currentStep?: number;
  setCurrentStep: (step: number) => void;

  refresh: () => void;
}

export const useContactStore = create<IContactStore>((set) => ({
  orderType: undefined,
  setOrderType: (orderType) => set({ orderType }),

  order: undefined,
  setOrder: (order) => set({ order }),

  aiProductTypes: [],
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

  currentType: undefined,
  setCurrentType: (currentType) => set({ currentType }),
  currentStep: 0,
  setCurrentStep: (currentStep) => set({ currentStep }),

  refresh: () =>
    set({
      orderType: undefined,
      order: undefined,
      currentType: undefined,
      currentStep: 0,
    }),
}));
