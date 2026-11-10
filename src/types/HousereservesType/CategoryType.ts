export interface ICategory {
    id: string;
    name: string;
}

export interface ICategoriesResponse {
    data: ICategory[];
    totalCount: number;
}