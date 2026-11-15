"use client";

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import { IUserProfile } from "../types/AuthType/Authtype";



interface IUserDataContext {
    userlogin: boolean;
    setUserLogin: (value: boolean) => void;
    userData: IUserProfile | null;
    setUserData: (value: IUserProfile | null) => void;
}

const UserDataContext = createContext<IUserDataContext | null>(null);

interface IUserDataContextProviderProps {
    children: ReactNode;
    initialUserLogin: boolean;
}

const UserDataContextProvider = ({
    children,
    initialUserLogin,
}: IUserDataContextProviderProps) => {
    const [userlogin, setUserLogin] = useState(initialUserLogin);
const [userData, setUserData] = useState<IUserProfile | null>(null);
    return (
        <UserDataContext.Provider
            value={{
                userlogin,
                setUserLogin,
                userData,
                setUserData,
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserDataContext);

    if (!context) {
        throw new Error(
            "useUserData must be used within UserDataContextProvider"
        );
    }

    return context;
};

export default UserDataContextProvider;