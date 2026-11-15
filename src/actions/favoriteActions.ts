"use server";

import apiServer from "@/lib/server";
import {
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

export const deleteFavoriteAction = async (id: string) => {
  const { data } = await apiServer.delete(`/api/favorites/${id}`);

  return data;
};