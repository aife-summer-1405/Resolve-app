
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3NyIsImVtYWlsIjoidGFiYXJpc2FkYWY3NUBnbWFpbC5jb20iLCJyb2xlIjoiYnV5ZXIiLCJuYW1lIjoi2YbYp9mFINqp2KfYsdio2LEiLCJwcm9maWxlUGljdHVyZSI6bnVsbCwiaWF0IjoxNzkzMTEyMjIxLCJleHAiOjE3OTMxMTU4MjF9.r_-sbfbtr-oteqoivJGHDuDj3WzT3g9jkrii4nsZt80";

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export default api;
