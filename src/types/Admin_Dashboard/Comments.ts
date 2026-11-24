export interface IComment {
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
    id: string;
    title: string;
    address: string;
  };
}

export interface ICommentsResponse {
  data: IComment[];
  totalCount: number;
}
export interface IUpdateCommentPayload {
  title: string;
  caption: string;
  rating: number;
}
