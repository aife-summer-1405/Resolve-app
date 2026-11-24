"use server";

import apiServer from "@/lib/server";

import type {
  IComment,
  ICommentsResponse,
  IUpdateCommentPayload,
} from "@/src/types/Admin_Dashboard/Comments";

export const getAdminCommentsAction = async (params: {
  page: number;
  limit: number;
}): Promise<ICommentsResponse> => {
  try {
    const { data } = await apiServer.get<ICommentsResponse>(
      "/api/admin/comments",
      {
        params,
      },
    );

    return data;
  } catch (error) {
    console.error("getAdminCommentsAction error:", error);
    throw error;
  }
};

export const getAdminCommentByIdAction = async (
  commentId: string,
): Promise<IComment> => {
  try {
    const { data } = await apiServer.get<IComment>(
      `/api/admin/comments/${commentId}`,
    );

    return data;
  } catch (error) {
    console.error("getAdminCommentByIdAction error:", error);
    throw error;
  }
};
export const updateAdminCommentAction = async (
  commentId: string,
  payload: IUpdateCommentPayload,
): Promise<IComment> => {
  try {
    const { data } = await apiServer.put<IComment>(
      `/api/admin/comments/${commentId}`,
      payload,
    );

    return data;
  } catch (error) {
    console.error("updateAdminCommentAction error:", error);
    throw error;
  }
};
export const deleteAdminCommentAction = async (
  commentId: string,
): Promise<void> => {
  try {
    await apiServer.delete(`/api/admin/comments/${commentId}`);
  } catch (error) {
    console.error("deleteAdminCommentAction error:", error);
    throw error;
  }
};
