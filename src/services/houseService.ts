import type { IHouseFilters } from "@/src/types/HousereservesType/HouseFilterType";

export interface HouseLocation {
  lat: number;
  lng: number;
}

export interface HouseCategory {
  name: string;
}

export interface House {
  id: string;
  title: string;
  address: string;
  photos: string[];
  rate: string;
  discounted_price: string | null;
  price: string;
  tags: string[];
  last_updated: string;
  capacity: number;
  location: HouseLocation;
  categories: HouseCategory;
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  num_comments: number;
  discount_id: string | null;
  transaction_type: string;
  sellerId: string;
  sellerName: string;
  caption: string | null;
  bookings: number;
  favoriteId: string | null;
  isFavorite: boolean;
}

export interface HousesResponse {
  houses: House[];
  totalCount: number;
}

export async function getHouses(
  filters: IHouseFilters = {},
): Promise<HousesResponse> {
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
    `https://aife-api.hexorix.net/api/houses?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch houses");
  }

  return (await response.json()) as HousesResponse;
}
