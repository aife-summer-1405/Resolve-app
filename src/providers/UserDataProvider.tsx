import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import UserProvider from "./UserProvider";
import { getUserAction } from "@/src/actions/authActions";

interface IUserDataProps {
    children: React.ReactNode;
}

export default async function UserDataProvider({
    children,
}: IUserDataProps) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: getUserAction,
    });

    return (
        <UserProvider>
            <HydrationBoundary state={dehydrate(queryClient)}>
                {children}
            </HydrationBoundary>
        </UserProvider>
    );
}