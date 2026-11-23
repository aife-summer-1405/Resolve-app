import type { Metadata } from "next";
import ArticleDetails from "@/src/components/organisms/articles/ArticleDetails";

export const metadata: Metadata = {
  title: "جزئیات مقاله | دلتا",
  description: "مشاهده جزئیات مقاله در دلتا",
};

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen">
      <ArticleDetails id={id} />
    </main>
  );
}