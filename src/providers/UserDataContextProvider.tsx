"use client";

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
} from "react";

import { IUserProfile } from "../types/AuthType/Authtype";

interface IUserDataContext {
    userlogin: boolean;
    setUserLogin: Dispatch<SetStateAction<boolean>>;
    userData: IUserProfile | null;
    setUserData: Dispatch<SetStateAction<IUserProfile | null>>;
}

const UserDataContext = createContext<IUserDataContext | null>(null);

interface IUserDataContextProviderProps {
    children: ReactNode;
    initialUserLogin: boolean;
    initialUserData: IUserProfile | null;
}

const UserDataContextProvider = ({
    children,
    initialUserLogin,
    initialUserData,
}: IUserDataContextProviderProps) => {
    const [userlogin, setUserLogin] = useState(initialUserLogin);
    const [userData, setUserData] = useState<IUserProfile | null>(initialUserData);

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