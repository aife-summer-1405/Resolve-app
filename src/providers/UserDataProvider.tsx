import { Suspense } from "react";
import UserProvider from "./UserProvider";
import { getUserAction } from "@/src/actions/authActions";

interface IUserDataProps {
    children: React.ReactNode;
}

async function UserData({ children }: IUserDataProps) {
    const user = await getUserAction();

    return (
        <UserProvider initialUser={user}>
            {children}
        </UserProvider>
    );
}

export default function UserDataProvider({ children }: IUserDataProps) {
    return (
        <Suspense fallback={<UserProvider initialUser={null}>{children}</UserProvider>}>
            <UserData>{children}</UserData>
        </Suspense>
    );
}