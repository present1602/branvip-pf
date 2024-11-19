import { create } from "zustand"
import { persist } from 'zustand/middleware';

interface IUser {
    id?: string;
    email?: string;
    name?: string | null;
}

interface IUserStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}


export const useUserStore = create(
    persist<IUserStore>(
        (set) => ({
            user: null,
            setUser: (user: IUser) =>
                set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage', // 로컬 스토리지에 저장될 이름
        }
    )
);
