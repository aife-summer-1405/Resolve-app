import { connection } from "next/server";
import { cookies } from "next/headers";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { getUserAction } from "../actions/authActions";
import UserDataContextProvider from "./UserDataContextProvider";

const UserDataProvider = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    await connection();

    const cookieStore = await cookies();
    const userlogin = !!cookieStore.get("accessToken")?.value;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: getUserAction,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UserDataContextProvider initialUserLogin={userlogin}>
                {children}
            </UserDataContextProvider>
        </HydrationBoundary>
    );
};

export default UserDataProvider;