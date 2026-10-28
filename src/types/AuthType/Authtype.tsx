export interface ILoginResponse {
    accessToken: string;
    refreshToken?: string;
    message?: string;
}

export interface IActionResponse {
  success: boolean;
  message?: string;
  tempUserId?: number;
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