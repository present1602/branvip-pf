import { create } from "zustand";

interface IProductStore {
  productId: number | null;
  setProductId: (productId: number | null) => void;
}

const useProductStore = create<IProductStore>((set) => ({
  productId: null,
  setProductId: (productId: number | null) => {
    set({ productId });
  },
}));

export default useProductStore;
