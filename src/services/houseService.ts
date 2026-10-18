import type { IHouseFilters } from "@/src/types/house";
import { getMockHouses } from "@/src/mocks/houses";

const USE_MOCK = true; 
export interface House {
  id: string;
  title: string;
  price?: number;
  area?: number;
  images?: string[];
  lat?: number | string;
  lng?: number | string;
  address?: string;
  location?: string;
  propertyType?: string;
  last_updated?: string;
}
export async function getHouses(filters: IHouseFilters = {}) {
  if (USE_MOCK) return getMockHouses(filters);
  console.log(111, filters)
  const params = new URLSearchParams();

  const query = {
    page: 1,
    limit: 10,
    ...filters,
  };

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(","));
      }
    } else {
      params.set(key, String(value));
    }
  });

  const response = await fetch(
    `https://aife-api.hexorix.net/api/houses?${params.toString()}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch houses");
  }
  console.log(333, response)

  return response.json();
}