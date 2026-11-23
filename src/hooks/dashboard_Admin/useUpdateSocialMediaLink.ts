
"use client";

import { updateSocialMediaLinkAction } from "@/src/actions/SocialMediaLinksAction";
import type { IUpdateSocialMediaLinkPayload } from "@/src/types/Admin_Dashboard/SocialMediaLinks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSocialMediaLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateSocialMediaLinkPayload) =>
      updateSocialMediaLinkAction(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["social-media-links"],
      });
    },
  });
};
