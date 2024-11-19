import { create } from "zustand";
const initialState = {
  applicantType: "",
  applicantPrice: "",
  designType: "",
  designPrice: "",
  priorityScreening: [],
  numberOfProducts: 0,
  finalPaymentPrice: 0,
  totalVAT: 0,
  discountAmount: 0,
  patentOfficeFee: 0,
  applicantFeatures: [],
  designFeatures: [],
};
interface PaymentStoreProps {
  applicantType: string;
  applicantPrice: string;

  setApplicantType: (applicantType: string) => void;
  setApplicantPrice: (applicantPrice: string) => void;

  applicantFeatures: string[];
  designFeatures: string[];

  setApplicantFeatures: (applicantFeatures: string[]) => void;
  setDesignFeatures: (designFeatures: string[]) => void;

  designType: string;
  designPrice: string;

  setDesignType: (designType: string) => void;
  setDesignPrice: (designPrice: string) => void;

  priorityScreening: string[];
  setPriorityScreening: (priorityScreening: string[]) => void;

  numberOfProducts: number;
  setNumberOfProducts: (numberOfProducts: number) => void;

  finalPaymentPrice: number;
  totalVAT: number;

  setFinalPaymentPrice: (finalPaymentPrice: number) => void;
  setTotalVAT: (totalVAT: number) => void;

  discountAmount: number;
  setDiscountAmount: (discountAmount: number) => void;

  patentOfficeFee: number;
  setPatentOfficeFee: (patentOfficeFee: number) => void;
  reset: () => void;
}

export const usePaymentStore = create<PaymentStoreProps>((set) => ({
  applicantType: "",
  setApplicantType: (applicantType) => set({ applicantType }),
  applicantPrice: "",
  setApplicantPrice: (applicantPrice) => set({ applicantPrice }),

  designType: "",
  setDesignType: (designType) => set({ designType }),
  designPrice: "",
  setDesignPrice: (designPrice) => set({ designPrice }),

  priorityScreening: [],
  setPriorityScreening: (priorityScreening) => set({ priorityScreening }),

  numberOfProducts: 0,
  setNumberOfProducts: (numberOfProducts) => set({ numberOfProducts }),

  finalPaymentPrice: 0,
  totalVAT: 0,

  setFinalPaymentPrice: (finalPaymentPrice) => set({ finalPaymentPrice }),
  setTotalVAT: (totalVAT) => set({ totalVAT }),

  discountAmount: 0,
  setDiscountAmount: (discountAmount) => set({ discountAmount }),

  patentOfficeFee: 0,
  setPatentOfficeFee: (patentOfficeFee) => set({ patentOfficeFee }),

  applicantFeatures: [],
  setApplicantFeatures: (applicantFeatures) => set({ applicantFeatures }),
  designFeatures: [],
  setDesignFeatures: (designFeatures) => set({ designFeatures }),
  reset: () => set(initialState),
}));
