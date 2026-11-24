"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminCommentAction } from "@/src/actions/CommentAction";
import type { IUpdateCommentPayload } from "@/src/types/Admin_Dashboard/Comments";

export const useUpdateAdminComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      payload,
    }: {
      commentId: string;
      payload: IUpdateCommentPayload;
    }) => updateAdminCommentAction(commentId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-comments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-comment", variables.commentId],
      });
    },
  });
};
