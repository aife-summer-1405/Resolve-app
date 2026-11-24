"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminCommentsAction } from "@/src/actions/CommentAction";
import type { ICommentsResponse } from "@/src/types/Admin_Dashboard/Comments";

export const useGetAdminComments = (params: {
  page: number;
  limit: number;
}) => {
  return useQuery<ICommentsResponse>({
    queryKey: ["admin-comments", params],
    queryFn: () => getAdminCommentsAction(params),
  });
};
