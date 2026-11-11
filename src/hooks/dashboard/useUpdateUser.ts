"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAction } from "../../actions/authActions";
import { IUpdateUserPayload, IUserResponse } from "../../types/AuthType/Authtype";


interface IUpdateUserVariables {
  id: string;
  payload: IUpdateUserPayload;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: IUpdateUserVariables) =>
      updateUserAction(id, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};