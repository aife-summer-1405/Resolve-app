import axios from "axios";

export interface ICreateComment {
    house_id: string;
    title: string;
    caption: string;
    rating: number;
    parent_comment_id: string | null;
}

export const createComment = async (data: ICreateComment) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
        data
    );

    return response.data;
};