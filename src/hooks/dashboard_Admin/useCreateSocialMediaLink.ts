
"use client";

import { createSocialMediaLinkAction } from "@/src/actions/SocialMediaLinksAction";
import type { ICreateSocialMediaLinkPayload } from "@/src/types/Admin_Dashboard/SocialMediaLinks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSocialMediaLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateSocialMediaLinkPayload) =>
      createSocialMediaLinkAction(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["social-media-links"],
      });
    },
  });
};
