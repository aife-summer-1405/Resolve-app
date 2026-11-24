"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminCommentAction } from "@/src/actions/CommentAction";

export const useDeleteAdminComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteAdminCommentAction(commentId),

    onSuccess: (_, commentId) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-comments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-comment", commentId],
      });
    },
  });
};
