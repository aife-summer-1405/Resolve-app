
import { connection } from "next/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserAction } from "../actions/authActions";

const UserDataProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await connection();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUserAction,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default UserDataProvider;
