import type { TransactionType } from "@/src/types/Seller_Dashboard/SellerHousesType";

export interface IHouseDetails {
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
    location: {
        lat: number;
        lng: number;
    };
    categories: {
        name: string;
    };
    bathrooms: number;
    parking: number;
    rooms: number;
    yard_type: string;
    num_comments: number;
    transaction_type: TransactionType;
    sellerId: string;
    sellerName: string;
    caption: string;
    favoriteId?: number;
    bookings: number;
    isFavorite: boolean;
}