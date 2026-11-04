import type { Metadata } from "next";
import ArticleDetails from "@/src/components/organisms/articles/ArticleDetails";

export const metadata: Metadata = {
  title: "جزئیات مقاله | دلتا",
  description: "مشاهده جزئیات مقاله در دلتا",
};

export default function ArticlePage() {
  return (
    <main className="min-h-screen">
      <ArticleDetails />
    </main>
  );
}