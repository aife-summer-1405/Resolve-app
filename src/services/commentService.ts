import api from "@/lib/axios";

export interface ICreateComment {
    house_id: string;
    title: string;
    caption: string;
    rating: number;
    parent_comment_id: string | null;
}

export const createComment = async (data: ICreateComment) => {
    const response = await api.post("/api/comments", data);

    return response.data;
};