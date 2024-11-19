import { create } from "zustand";

interface useColorStoreProps {
  colors: string[];
  setColors: (color: string[]) => void;
  otherRequests: string;
  setOtherRequests: (otherRequests: string) => void;
}

const useColorStore = create<useColorStoreProps>((set) => ({
  colors: [],
  setColors: (colors: string[]) => {
    set({ colors });
  },
  otherRequests: "",
  setOtherRequests: (otherRequests: string) => {
    set({ otherRequests });
  },
}));

export default useColorStore;
