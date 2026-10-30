"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useUserStore } from "@/src/store/userStore";
import { IUser } from "../types/AuthType/Authtype";

interface IUserProviderProps {
    children: ReactNode;
    initialUser: IUser | null;
}

export default function UserProvider({
    children,
    initialUser,
}: IUserProviderProps) {
    const setUser = useUserStore((state) => state.setUser);
    const clearUser = useUserStore((state) => state.clearUser);

    useEffect(() => {
        if (initialUser) {
            setUser(initialUser);
        } else {
            clearUser();
        }
    }, [initialUser, setUser, clearUser]);

    return <>{children}</>;
}