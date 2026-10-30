export interface ILoginResponse {
    accessToken: string;
    refreshToken?: string;
    message?: string;
    user: {
        id: number;
    };
}
export interface IActionResponse {
  success: boolean;
  message?: string;
  userId?: number;
}
export type AuthButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit";
    disabled?: boolean;
    onClick?: () => void;
};

export interface IVerifyOtpRequest {
    otp: string;
}
export interface ICompleteRegistrationResponse {
    message?: string;
}
export interface IVerifyResetCodeProps {
  email: string;
  onSuccess: (code: string) => void;
  onBack: () => void;
}
export interface IVerifyResetCodeRequest {
  email: string;
  code: string;
}

export interface IResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface IResetPasswordProps {
  email: string;
  code: string;
  onBack: () => void;
}
export interface IUser {
    id: string;
    role: string;
    membershipDate: string | null;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    fullName: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    createdAt: string;
    updatedAt: string;
    created_at: string;
    updated_at: string;
}

export interface IUserResponse {
    user: IUser;
    additionalPercentage: number;
}