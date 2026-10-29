
import "server-only";

import axios from "axios";
import { cookies } from "next/headers";

const apiServer = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 15000,
});

apiServer.interceptors.request.use(async (config) => {
    console.log(33333333333333333333)
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
        config.headers.set(
            "Authorization",
            `Bearer ${accessToken}`
        );
    }

    return config;
});

apiServer.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default apiServer;
