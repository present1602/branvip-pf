import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IProgressStore {
  value: number;
  step: number;
  setProgressValue: (value: number | ((prevState: number) => number)) => void;
  setStep: (step: number) => void;
}

export const useProgressStore = create(
  persist<IProgressStore>(
    (set) => ({
      value: 0,
      step: 0,
      setProgressValue: (value: number | ((prevState: number) => number)) =>
        set((state) => ({
          value: typeof value === "function" ? value(state.value) : value,
        })),
      setStep: (step: number) => {
        set({ step });
      },
    }),
    {
      name: "progress-key",
    }
  )
);
