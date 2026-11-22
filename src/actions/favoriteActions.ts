"use server";

import apiServer from "@/lib/server";
import {
  IAddFavoritePayload,
  IGetFavoritesParams,
  IGetFavoritesResponse,
} from "@/src/types/dashboard/favorite";

export const getFavoritesAction = async (
  userId: string,
  params: IGetFavoritesParams
): Promise<IGetFavoritesResponse> => {
  const { data } = await apiServer.get<IGetFavoritesResponse>(
    `/api/favorites/user/${userId}`,
    { params }
  );

  return data;
};

export const deleteFavoriteAction = async (id: number) => {
  const { data } = await apiServer.delete(`/api/favorites/${id}`);

  return data;
};




export const addFavoriteAction = async (
    payload: IAddFavoritePayload
) => {
    const { data } = await apiServer.post("/api/favorites", payload);

    return data;
};