"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addFavoriteAction,
  deleteFavoriteAction,
  getFavoritesAction,
} from "@/src/actions/favoriteActions";
import { IGetFavoritesParams } from "@/src/types/dashboard/favorite";

export const useGetFavorites = (
  userId: string | undefined,
  params: IGetFavoritesParams
) => {
  return useQuery({
    queryKey: ["favorites", userId, params],
    queryFn: () => getFavoritesAction(userId!, params),
    enabled: !!userId,
    staleTime: Infinity,
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavoriteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });
};


export const useAddFavorite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addFavoriteAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
        },
    });
};