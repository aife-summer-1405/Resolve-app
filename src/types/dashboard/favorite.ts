export interface IFavoriteHouse {
  id: string;
  title: string;
  address: string;
  photos: string[] | null;
  rate: string;
  price: string;
}

export interface IFavorite {
  id: string;
  user_id: string;
  house_id: string;
  created_at: string;
  updated_at: string;
  house: IFavoriteHouse;
}

export interface IGetFavoritesParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
}

export interface IGetFavoritesResponse {
  data: IFavorite[];
  totalCount: number;
}

export interface IAddFavoritePayload {
    house_id: string;
    user_id: string;
}