export type TransactionType =
  | "rental"
  | "mortgage"
  | "reservation"
  | "direct_purchase";

export type ISellerHouse = {
  id: string;
  title: string;
  address: string;
  photos: string[] | null;
  rate: string;
  price: string;
  discounted_price: string | null;
  tags: string[];
  last_updated: string;
  capacity: number;
  location: { lat: number; lng: number };
  categories: Record<string, string>;
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  num_comments: number;
  transaction_type: TransactionType;
  sellerId: string;
  sellerName: string;
  caption: string | null;
};

export type ISellerHousesResponse = {
  houses: ISellerHouse[];
  totalCount: number;
};

export type SellerHousesParams = {
  page: number;
  limit: number;
  sort?: string;
  order?: "ASC" | "DESC";
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  transaction_type?: TransactionType;
};