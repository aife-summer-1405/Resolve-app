"use client";

import { uploadHousePhotosAction } from "@/src/actions/uploadHousePhotosAction";
import { useMutation } from "@tanstack/react-query";

interface IUploadHousePhotosParams {
  id: number | string;
  formData: FormData;
}

export const useUploadHousePhotos = () => {
  return useMutation({
    mutationFn: ({ id, formData }: IUploadHousePhotosParams) => {
      console.log(formData);
      return uploadHousePhotosAction(id, formData);
    },
  });
};