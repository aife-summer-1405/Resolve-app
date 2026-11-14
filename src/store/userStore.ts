import { create } from "zustand";

interface IUserStore {
    userId: string | null;
    setUserId: (id: string | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    userId: null,

    setUserId: (id) => set({ userId: id }),

    clearUser: () => set({ userId: null }),
}));