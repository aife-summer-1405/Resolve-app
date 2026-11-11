import { create } from "zustand";

interface ArticleStore {
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
}

export const useArticleStore = create<ArticleStore>((set) => ({
  selectedCategoryId: null,
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));