import { connection } from "next/server";
import { cookies } from "next/headers";
import UserDataContextProvider from "./UserDataContextProvider";
import { getUserAction } from "../actions/authActions";

const UserDataProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await connection();

  const cookieStore = await cookies();
  const userlogin = !!cookieStore.get("accessToken")?.value;

  const response = userlogin ? await getUserAction() : null;

  return (
    <UserDataContextProvider
      initialUserLogin={userlogin}
      initialUserData={response}
    >
      {children}
    </UserDataContextProvider>
  );
};

export default UserDataProvider;