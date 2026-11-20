"use server";

import apiServer from "@/lib/server";


export const deleteSellerHouseAction = async (id: number) => {
  await apiServer.delete(`/api/houses/${id}`);
};