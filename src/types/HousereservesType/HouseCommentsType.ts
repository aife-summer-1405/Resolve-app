export interface IHouseComment {
    id: string;
    house_id: string;
    title: string;
    caption: string;
    rating: string;
    created_at: string;
    parent_comment_id: string | null;
    user: {
        firstName: string;
        lastName: string;
        profilePicture: string | null;
    };
    house: {
        id: number;
        title: string;
        address: string;
    };
    parent_comment: IHouseComment | null;
}

export interface IHouseCommentsResponse {
    comments: IHouseComment[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

export interface ICreateCommentInput {
    house_id: number;
    title: string;
    caption: string;
    rating: number;
    parent_comment_id: number | null;
}

export interface ICreateCommentResult {
    success: boolean;
    data?: unknown;
    message?: string;
}