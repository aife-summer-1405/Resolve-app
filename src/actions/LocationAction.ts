"use server";

import apiServer from "@/lib/server";

import type { ILocationsResponse } from "@/src/types/Admin_Dashboard/Locations";

export const getLocationsAction = async (params: {
  page: number;
  limit: number;
}): Promise<ILocationsResponse> => {
  try {
    const { data } = await apiServer.get<ILocationsResponse>("/api/locations", {
      params,
    });

    return data;
  } catch (error) {
    console.error("getLocationsAction error:", error);
    throw error;
  }
};

export const createLocationAction = async (payload: {
  area_name: string;
  lat: number;
  lng: number;
}) => {
  try {
    const { data } = await apiServer.post("/api/locations", payload);

    return data;
  } catch (error) {
    console.error("createLocationAction error:", error);
    throw error;
  }
};

export const deleteLocationAction = async (locationId: string) => {
  try {
    const { data } = await apiServer.delete(`/api/locations/${locationId}`);
    return data;
  } catch (error) {
    console.error("deleteLocationAction error:", error);
    throw error;
  }
};

export const updateLocationAction = async (
  locationId: string,
  payload: {
    area_name: string;
    lat: number;
    lng: number;
  },
) => {
  try {
    const { data } = await apiServer.put(
      `/api/locations/${locationId}`,
      payload,
    );

    return data;
  } catch (error) {
    console.error("updateLocationAction error:", error);
    throw error;
  }
};
