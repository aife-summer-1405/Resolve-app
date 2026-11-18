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
