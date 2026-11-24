"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminCommentByIdAction } from "@/src/actions/CommentAction";

export const useGetAdminCommentById = (commentId: string) => {
  return useQuery({
    queryKey: ["admin-comment", commentId],
    queryFn: () => getAdminCommentByIdAction(commentId),
    enabled: !!commentId,
  });
};
