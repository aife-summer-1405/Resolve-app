import "server-only";

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const apiServer = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 15000,
});

const refreshClient = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 15000,
});

interface IRetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

interface IRefreshResponse {
    accessToken: string;
    refreshToken?: string;
}

apiServer.interceptors.request.use(async (config) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return config;
});

apiServer.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as IRetryConfig | undefined;

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            originalRequest.url?.includes("/api/auth/refresh")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const cookieStore = await cookies();
            const refreshToken = cookieStore.get("refreshToken")?.value;

            if (!refreshToken) {
                throw new Error("Refresh token not found");
            }

            const response = await refreshClient.post<IRefreshResponse>(
                "/api/auth/refresh",
                { token: refreshToken }
            );

            const { accessToken, refreshToken: newRefreshToken } =
                response.data;

            if (!accessToken) {
                throw new Error("New access token not received");
            }

            cookieStore.set("accessToken", accessToken,     {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                 maxAge: 60 * 60,
            });

            if (newRefreshToken) {
                cookieStore.set("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                    maxAge: 60 * 60 * 24 * 30,
                });
            }

            originalRequest.headers.set(
                "Authorization",
                `Bearer ${accessToken}`
            );

            return apiServer(originalRequest);
        } catch (refreshError) {
            cookieStore.delete("accessToken");
            cookieStore.delete("refreshToken");
            cookieStore.delete("userId");

            return Promise.reject(refreshError);
        }
    }
);

export default apiServer;