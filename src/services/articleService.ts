import type {
  IArticle,
  IArticleFilters,
  IArticlesResponse,
} from "../types/ArticleType/ArticleType";

const BASE_URL = "https://aife-api.hexorix.net";

export async function getArticles(
  filters: IArticleFilters = {},
): Promise<IArticlesResponse> {
  const params = new URLSearchParams();

  const query = {
    page: 1,
    limit: 10,
    sort: "created_at",
    order: "DESC",
    ...filters,
  };

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    params.set(key, String(value));
  });

  const response = await fetch(
    `${BASE_URL}/api/blogs?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("دریافت مقالات با خطا مواجه شد.");
  }

  return (await response.json()) as IArticlesResponse;
}

export async function getArticleById(id: string): Promise<IArticle> {
  const response = await fetch(`${BASE_URL}/api/blogs/${id}`);

  if (!response.ok) {
    throw new Error("دریافت جزئیات مقاله با خطا مواجه شد.");
  }

  return (await response.json()) as IArticle;
}