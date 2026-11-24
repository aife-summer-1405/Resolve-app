"use server";

import apiServer from "@/lib/server";

export const uploadHousePhotosAction = async (
  id: number | string,
  formData: FormData
) => {
  const response = await apiServer.post(
    `/api/houses/upload/photos/${id}`,
    formData
  );

  return response.data;
};