"use client";

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface IUserDataContext {
    userlogin: boolean;
    setUserLogin: (value: boolean) => void;
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

    return (
        <UserDataContext.Provider value={{ userlogin, setUserLogin }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserDataContext);

    if (!context) {
        throw new Error("useUserData must be used within UserDataContextProvider");
    }

    return context;
};

export default UserDataContextProvider;