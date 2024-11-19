import { create } from "zustand";

interface IEmailStore {
    email: string;
    setEmail: (email: string) => void;
    message?: string;
    setMessage: (error: string) => void;
}

const useEmailStore = create<IEmailStore>((set) => ({
    email: '',
    setEmail: (email: string) => {
        set({ email });
    },

    message: '',
    setMessage: (message: string) => {
        set({ message });
    },
}));

export default useEmailStore;
