export interface IArticle {
  id: string;
  title: string;
  caption: string;
  estimated_reading_time: string;
  author_id: string;
  created_at: string;
  category_id: string;
}

export interface IArticlesResponse {
  data: IArticle[];
  totalCount: number;
}

export interface IArticleFilters {
  page?: number;
  limit?: number;
  sort?: "created_at" | "updated_at" | "title";
  order?: "ASC" | "DESC";
  title?: string;
  author_id?: number;
  category_id?: number;
}