export interface IAdminUser {
  id: string | number;
  role: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  profilePicture: string | null;
  fullName: string;
  createdAt: string;
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
  role?: string;
  membershipDate?: string;
}
