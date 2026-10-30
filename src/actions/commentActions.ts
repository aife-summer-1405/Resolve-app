"use server";

import apiServer from "@/lib/server";
import type { AxiosError } from "axios";
import { ICreateCommentInput, ICreateCommentResult } from "../types/HousereservesType/HouseCommentsType";

export async function createCommentAction(
    input: ICreateCommentInput
): Promise<ICreateCommentResult> {
    try {
        const response = await apiServer.post("/api/comments", input);

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;

        return {
            success: false,
            message:
                axiosError.response?.data?.message ??
                "ثبت نظر با خطا مواجه شد.",
        };
    }
}