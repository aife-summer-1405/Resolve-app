
"use server";

import apiServer from "@/lib/server";

import type {
  IGetSocialMediaLinksParams,
  ISocialMediaLinksResponse,
  ICreateSocialMediaLinkPayload,
  IUpdateSocialMediaLinkPayload,
} from "@/src/types/Admin_Dashboard/SocialMediaLinks";

export const getSocialMediaLinksAction = async (
  params: IGetSocialMediaLinksParams,
): Promise<ISocialMediaLinksResponse> => {
  try {
    const { data } = await apiServer.get<ISocialMediaLinksResponse>(
      "/api/social-media-links",
      { params },
    );

    return data;
  } catch (error) {
    console.error("getSocialMediaLinksAction error:", error);
    throw error;
  }
};

export const createSocialMediaLinkAction = async (
  payload: ICreateSocialMediaLinkPayload,
) => {
  try {
    const { data } = await apiServer.post(
      "/api/social-media-links",
      payload,
    );

    return data;
  } catch (error) {
    console.error("createSocialMediaLinkAction error:", error);
    throw error;
  }
};
export const updateSocialMediaLinkAction = async (
  payload: IUpdateSocialMediaLinkPayload,
) => {
  try {
    const { id, ...body } = payload;

    const { data } = await apiServer.put(
      `/api/social-media-links/${id}`,
      body,
    );

    return data;
  } catch (error) {
    console.error("updateSocialMediaLinkAction error:", error);
    throw error;
  }
};

export const deleteSocialMediaLinkAction = async (id: string) => {
  try {
    const { data } = await apiServer.delete(
      `/api/social-media-links/${id}`,
    );

    return data;
  } catch (error) {
    console.error("deleteSocialMediaLinkAction error:", error);
    throw error;
  }
};