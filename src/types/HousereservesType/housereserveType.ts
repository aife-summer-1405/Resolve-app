export interface ICreateComment {
    house_id: string;
    title: string;
    caption: string;
    rating: number;
    parent_comment_id: string | null;
}