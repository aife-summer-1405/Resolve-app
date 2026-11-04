import type { Metadata } from "next";
import ArticlesContent from "@/src/components/organisms/articles/ArticlesContent";
import ArticlesCategories from "@/src/components/organisms/articles/ArticlesCategories";
import ArticlesList from "@/src/components/organisms/articles/ArticlesList";

export const metadata: Metadata = {
  title: "مقالات | دلتا",
  description: "جدیدترین مقالات و مطالب دلتا",
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen ">
      <ArticlesContent />
      <ArticlesCategories />
      <ArticlesList />
    </main>
  );
}