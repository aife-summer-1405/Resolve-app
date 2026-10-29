import apiClient from "@/lib/client";
import { ICreateComment } from "../types/HousereservesType/housereserveType";



export const createComment = async (data: ICreateComment) => {
    const response = await apiClient.post("/api/comments", data);

    return response.data;
};