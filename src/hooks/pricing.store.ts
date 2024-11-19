import { Pricing } from "@prisma/client";
import { create } from "zustand";
import { useContactStore } from "./contact.store";

export type TPackageType = "all" | "design" | "application";

interface IPricingState {
  packageType?: TPackageType;
  selectedPricings: Pricing[];
  totalPrice: number;

  totalRegularPrice: number;
  finalPaymentPrice: number;
  totalPatentOfficeFee: number;
  tenPercentDiscountAmount: number;
  applicationMultiplier: number;
  totalVAT: number;

  setPackageType: (type: TPackageType) => void;
  setSelectedPricings: (pricings: Pricing[]) => void;
  reset: () => void;
}

export const usePricingStore = create<IPricingState>((set) => ({
  packageType: undefined,
  selectedPricings: [],
  totalPrice: 0,
  totalRegularPrice: 0,
  finalPaymentPrice: 0,
  totalPatentOfficeFee: 0,
  tenPercentDiscountAmount: 0,
  applicationMultiplier: 0,
  totalVAT: 0,

  setPackageType: (type) => set({ packageType: type }),
  setSelectedPricings: (pricings) => {
    let totalPrice = pricings.reduce((acc, curr) => acc + curr.price, 0);

    let totalRegularPrice = pricings.reduce(
      (acc, curr) =>
        acc + (curr?.regularPrice ? curr.regularPrice : curr.price),
      0
    );

    set({
      selectedPricings: pricings,
      totalPrice,
    });

    const { orderType, order } = useContactStore.getState();
    if (!orderType || !order) return;

    let totalVAT = 0;
    const VATMultiplier = 1.1;
    const totalPatentOfficeFee = pricings.reduce(
      (acc, curr) => acc + (curr?.patentOfficeFee ? curr?.patentOfficeFee : 0),
      0
    );
    let finalPaymentPrice = 0;
    let tenPercentDiscountAmount = 0;
    let applicationMultiplier = 0;

    if (orderType === "DESIGN") {
      totalRegularPrice = totalRegularPrice * VATMultiplier;
      finalPaymentPrice = Math.floor(totalPrice * VATMultiplier);
      totalVAT = Math.floor(totalPrice * 0.1);
    } else {
      const codeCount = (order?.productTypeCodes as string[])?.length || 0;
      const logo = order?.isLogoIncluded ? 1 : 0;
      const bookmark = order?.isWordmarkIncluded ? 1 : 0;

      applicationMultiplier = (logo + bookmark) * codeCount;

      if (orderType === "APPLICATION") {
        totalRegularPrice =
          totalRegularPrice * applicationMultiplier * VATMultiplier +
          totalPatentOfficeFee * applicationMultiplier;
        finalPaymentPrice = Math.floor(
          totalPrice * applicationMultiplier * VATMultiplier +
            totalPatentOfficeFee * applicationMultiplier
        );
        totalVAT = Math.floor(totalPrice * applicationMultiplier * 0.1);
      } else {
        if (pricings.length !== 2) {
          set({
            finalPaymentPrice: 0,
          });
          return;
        }
        // All in One
        const applicationPricing = pricings.filter(
          (pricing) => pricing.type === "APPLICATION_WITH_DESIGN"
        )[0];
        const designPricing = pricings.filter(
          (pricing) => pricing.type === "DESIGN"
        )[0];

        const servicePrice =
          applicationPricing.price * applicationMultiplier +
          designPricing.price;
        tenPercentDiscountAmount = servicePrice * 0.1;

        finalPaymentPrice = Math.floor(
          (servicePrice - tenPercentDiscountAmount) * VATMultiplier +
            totalPatentOfficeFee * applicationMultiplier
        );

        totalVAT = Math.floor((servicePrice - tenPercentDiscountAmount) * 0.1);
      }
    }

    set({
      totalRegularPrice,
      finalPaymentPrice,
      totalPatentOfficeFee,
      applicationMultiplier,
      tenPercentDiscountAmount,
      totalVAT,
    });
  },

  reset: () =>
    set({
      packageType: undefined,
      selectedPricings: [],
      totalPrice: 0,
      totalRegularPrice: 0,
      finalPaymentPrice: 0,
      totalPatentOfficeFee: 0,
      tenPercentDiscountAmount: 0,
      totalVAT: 0,
    }),
}));
