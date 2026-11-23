
export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoriesResponse {
  data: ICategory[];
  totalCount: number;
}

export interface IGetCategoriesParams {
  page?: number;
  limit?: number;
}

export interface ICreateCategoryPayload {
  name: string;
}

export interface IUpdateCategoryPayload {
  id: string;
  name: string;
}
