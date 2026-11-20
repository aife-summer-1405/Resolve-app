import { create } from "zustand";
import { ISellerHouse } from "../types/Seller_Dashboard/SellerHousesType";

interface ISellerHouseStore {
  selectedHouse: ISellerHouse | null;
  setSelectedHouse: (house: ISellerHouse | null) => void;
  clearSelectedHouse: () => void;
}

export const useSellerHouseStore = create<ISellerHouseStore>((set) => ({
  selectedHouse: null,

  setSelectedHouse: (house) => set({ selectedHouse: house }),

  clearSelectedHouse: () => set({ selectedHouse: null }),
}));