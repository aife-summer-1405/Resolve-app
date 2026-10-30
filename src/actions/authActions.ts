
"use server";

import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import apiServer from "@/lib/server";

import { loginSchema, ILoginForm } from "@/src/schemas/auth/loginSchema";
import { IRegisterForm, registerSchema } from "../schemas/auth/registerSchema";
import {
    completeRegistrationSchema,
    ICompleteRegistrationForm,
} from "../schemas/auth/completeRegistrationSchema";
import {
    IRequestResetCodeForm,
    requestResetCodeSchema,
} from "../schemas/auth/requestResetCodeSchema";
import { resetPasswordSchema } from "../schemas/auth/resetPasswordSchema";

import {
    IActionResponse,
    ICompleteRegistrationResponse,
    ILoginResponse,
    IResetPasswordRequest,
    IUser,
    IUserResponse,
    IVerifyOtpRequest,
    IVerifyResetCodeRequest,
} from "../types/AuthType/Authtype";

export async function actionLogin(
    raw: ILoginForm,
): Promise<IActionResponse> {
    const validation = loginSchema.safeParse(raw);

    if (!validation.success) {
        return {
            success: false,
            message: "ایمیل یا رمز عبور معتبر نیست.",
        };
    }

    try {
        const response = await apiServer.post<ILoginResponse>(
            "/api/auth/login",
            validation.data,
        );

        const { accessToken, refreshToken, user } = response.data;

        if (!accessToken || !user?.id) {
            return {
                success: false,
                message: "اطلاعات ورود از سرور کامل دریافت نشد.",
            };
        }

        const cookieStore = await cookies();

        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        if (refreshToken) {
            cookieStore.set("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 30,
            });
        }

        cookieStore.set("userId", String(user.id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });

        return {
            success: true,
            message: "ورود با موفقیت انجام شد.",
            userId: user.id,
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "ایمیل یا رمز عبور اشتباه است.",
            };
        }

        return {
            success: false,
            message: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        };
    }
}

export async function actionRegister(
    raw: IRegisterForm,
): Promise<IActionResponse> {
    const validation = registerSchema.safeParse(raw);

    if (!validation.success) {
        return {
            success: false,
            message: "لطفاً ایمیل معتبر وارد کنید.",
        };
    }

    try {
        const response = await apiServer.post(
            "/api/auth/register",
            validation.data,
        );

        const tempUserId = response.data?.tempUserId;

        if (tempUserId === undefined || tempUserId === null) {
            return {
                success: false,
                message: "شناسه موقت کاربر از سرور دریافت نشد.",
            };
        }

        const cookieStore = await cookies();

        cookieStore.set("tempUserId", String(tempUserId), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 10,
        });

        return {
            success: true,
            message: response.data?.message || "کد تأیید ارسال شد.",
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "ثبت‌نام انجام نشد. لطفاً دوباره تلاش کنید.",
            };
        }

        return {
            success: false,
            message: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        };
    }
}

export async function actionVerifyOtp(
    raw: IVerifyOtpRequest,
): Promise<IActionResponse> {
    const otp = raw.otp.trim();

    if (!/^\d{6}$/.test(otp)) {
        return {
            success: false,
            message: "کد تأیید باید ۶ رقم باشد.",
        };
    }

    try {
        const cookieStore = await cookies();
        const tempUserId = cookieStore.get("tempUserId")?.value;

        if (!tempUserId) {
            return {
                success: false,
                message: "شناسه ثبت‌نام پیدا نشد. دوباره ثبت‌نام کنید.",
            };
        }

        const response = await apiServer.post(
            "/api/auth/verify-email",
            {
                tempUserId,
                verificationCode: otp,
            },
        );

        const { message, userId } = response.data;

        if (userId === undefined || userId === null) {
            return {
                success: false,
                message: "شناسه کاربر از سرور دریافت نشد.",
            };
        }

        cookieStore.set("userId", String(userId), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        cookieStore.delete("tempUserId");

        return {
            success: true,
            message: message || "ایمیل با موفقیت تأیید شد.",
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "کد تأیید نامعتبر است.",
            };
        }

        return {
            success: false,
            message: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        };
    }
}

export async function actionResendOtp(): Promise<IActionResponse> {
    try {
        const cookieStore = await cookies();
        const email = cookieStore.get("pendingEmail")?.value;

        if (!email) {
            return {
                success: false,
                message: "ایمیل ثبت‌نام پیدا نشد. دوباره ثبت‌نام کنید.",
            };
        }

        const response = await apiServer.post(
            "/api/auth/resend-otp",
            { email },
        );

        return {
            success: true,
            message: response.data?.message || "کد جدید ارسال شد.",
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "ارسال مجدد کد ناموفق بود.",
            };
        }

        return {
            success: false,
            message: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        };
    }
}

export async function actionCompleteRegistration(
    raw: ICompleteRegistrationForm,
): Promise<IActionResponse> {
    const validation = completeRegistrationSchema.safeParse(raw);

    if (!validation.success) {
        return {
            success: false,
            message: "شماره تلفن یا رمز عبور معتبر نیست.",
        };
    }

    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("userId")?.value;

        if (!userId) {
            return {
                success: false,
                message: "شناسه کاربر پیدا نشد. لطفاً دوباره ثبت‌نام کنید.",
            };
        }

        const response =
            await apiServer.post<ICompleteRegistrationResponse>(
                "/api/auth/complete-registration",
                {
                    userId,
                    password: validation.data.password,
                    phoneNumber: validation.data.phoneNumber,
                },
            );

        return {
            success: true,
            message: response.data?.message || "ثبت‌نام تکمیل شد.",
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "تکمیل ثبت‌نام انجام نشد. دوباره تلاش کنید.",
            };
        }

        return {
            success: false,
            message: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        };
    }
}

export async function actionRequestResetCode(
    raw: IRequestResetCodeForm,
): Promise<IActionResponse> {
    const validation = requestResetCodeSchema.safeParse(raw);

    if (!validation.success) {
        return {
            success: false,
            message: "لطفاً ایمیل معتبر وارد کنید.",
        };
    }

    try {
        const response = await apiServer.post(
            "/api/auth/forgot-password/request",
            {
                email: validation.data.email,
            },
        );

        return {
            success: true,
            message: response.data?.message || "کد بازیابی ارسال شد.",
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "ارسال کد بازیابی انجام نشد.",
            };
        }

        return {
            success: false,
            message: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        };
    }
}

export async function actionVerifyResetCode(
    data: IVerifyResetCodeRequest,
): Promise<IActionResponse> {
    const email = data.email.trim();
    const code = data.code.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
            success: false,
            message: "ایمیل معتبر نیست.",
        };
    }

    if (!/^\d{6}$/.test(code)) {
        return {
            success: false,
            message: "کد تأیید باید ۶ رقم باشد.",
        };
    }

    try {
        const response = await apiServer.post(
            "/api/auth/forgot-password/verify",
            {
                email,
                code,
            },
        );

        return {
            success: true,
            message: response.data?.message || "کد بازیابی تأیید شد.",
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "کد بازیابی نامعتبر است یا منقضی شده است.",
            };
        }

        return {
            success: false,
            message: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        };
    }
}

export async function actionResetPassword(
    data: IResetPasswordRequest,
): Promise<IActionResponse> {
    const email = data.email.trim();
    const code = data.code.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
            success: false,
            message: "ایمیل معتبر نیست.",
        };
    }

    if (!/^\d{6}$/.test(code)) {
        return {
            success: false,
            message: "کد بازیابی باید ۶ رقم باشد.",
        };
    }

    const validation = resetPasswordSchema.safeParse({
        newPassword: data.newPassword,
        confirmPassword: data.newPassword,
    });

    if (!validation.success) {
        return {
            success: false,
            message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
        };
    }

    try {
        const response = await apiServer.post(
            "/api/auth/forgot-password/reset",
            {
                email,
                code,
                newPassword: validation.data.newPassword,
            },
        );

        return {
            success: true,
            message:
                response.data?.message ||
                "رمز عبور با موفقیت تغییر کرد.",
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "تغییر رمز عبور انجام نشد. کد بازیابی را بررسی کنید.",
            };
        }

        return {
            success: false,
            message: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        };
    }
}
export async function getUserAction(): Promise<IUser | null> {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("userId")?.value;

        if (!userId || !/^\d+$/.test(userId)) {
            return null;
        }

        const response = await apiServer.get<IUserResponse>(
            `/api/users/${userId}`,
        );

        return response.data.user;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error(
                "Get user error:",
                error.response?.data?.message,
            );
        }

        return null;
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();

    try {
        await apiServer.post("/auth/logout");

        return { success: true };
    } catch (error) {
        console.error("Logout error:", error);

        return { success: false };
    } finally {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        cookieStore.delete("userId");
    }
}