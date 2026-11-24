"use client";

import { getSocialMediaLinksAction } from "@/src/actions/SocialMediaLinksAction";
import { useQuery } from "@tanstack/react-query";

import type { IGetSocialMediaLinksParams } from "@/src/types/Admin_Dashboard/SocialMediaLinks";

export const useGetSocialMediaLinks = (
  params: IGetSocialMediaLinksParams,
) => {
  return useQuery({
    queryKey: ["social-media-links", params],
    queryFn: () => getSocialMediaLinksAction(params),
  });
};