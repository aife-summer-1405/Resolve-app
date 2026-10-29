
import axios from "axios";

const apiClient = axios.create({
    baseURL: "/backend",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default apiClient;
