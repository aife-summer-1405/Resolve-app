import "server-only";

import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";
import { cookies } from "next/headers";
import { refreshTokenAction } from "@/src/actions/authActions";

const apiServer = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 300000,
});

interface IRetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
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
            originalRequest._retry
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const accessToken = await refreshTokenAction();

            originalRequest.headers.set(
                "Authorization",
                `Bearer ${accessToken}`
            );

            return apiServer(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
);

export default apiServer;