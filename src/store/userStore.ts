import { create } from "zustand";
import { IUser } from "../types/AuthType/Authtype";

interface IUserStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    user: null,

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),
}));