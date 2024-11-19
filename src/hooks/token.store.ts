import { create } from "zustand";

interface ITokenProps {
  token: string[];
  setToken: (token: string) => void;
  addToken: (token: string) => void;
  removeToken: (token: string) => void;
  hasToken: (token: string) => boolean;
  getTokens: () => string[];
}

export const useTokenState = create<ITokenProps>((set, get) => ({
  token: [],
  setToken: (token) => set({ token: [token] }),
  addToken: (token) => set((state) => ({ token: [...state.token, token] })),
  removeToken: (token) => set((state) => ({ token: state.token.filter((t) => t !== token) })),
  hasToken: (token) => get().token.includes(token),
  getTokens: () => get().token,
}));