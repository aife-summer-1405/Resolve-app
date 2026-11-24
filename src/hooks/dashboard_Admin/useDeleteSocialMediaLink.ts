
"use client";

import { deleteSocialMediaLinkAction } from "@/src/actions/SocialMediaLinksAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSocialMediaLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSocialMediaLinkAction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["social-media-links"],
      });
    },
  });
};
