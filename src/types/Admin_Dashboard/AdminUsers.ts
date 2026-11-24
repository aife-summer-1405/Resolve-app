export type AdminUserRole = "admin" | "seller" | "buyer";

export interface IAdminUser {
  id: string | number;
  role: AdminUserRole;
  email: string;
  firstName: string;
  lastName: string;
  membershipDate: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  profilePicture: string | null;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminUsersResponse {
  data: IAdminUser[];
  totalCount: number;
}

export interface IGetAdminUsersParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  email?: string;
  role?: AdminUserRole;
  membershipDate?: string;
}

export interface IUpdateAdminUserPayload {
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  emailVerified: boolean;
  membershipDate: string | null;
  profilePicture: string | null;
}

export interface IUpdateAdminUserRolePayload {
  id: string | number;
  role: AdminUserRole;
}