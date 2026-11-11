"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Clock3 } from "lucide-react";
import FileContainer from "@/src/components/Ui/FileContainer";
import { getArticles } from "@/src/services/articleService";
import type { IArticle } from "@/src/types/ArticleType/ArticleType";

const ITEMS_PER_PAGE = 9;

export default function ArticlesList() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getArticles({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          sort: "created_at",
          order: "DESC",
        });

        setArticles(response.data);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error("Articles error:", error);
        setError("دریافت مقالات با خطا مواجه شد.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <section
        dir="rtl"
        className="mx-auto w-full max-w-[1600px] px-6 py-16"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <div
              key={index}
              className="h-[350px] animate-pulse rounded-2xl bg-[#303030]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        dir="rtl"
        className="flex flex-col items-center justify-center gap-5 py-20 text-white"
      >
        <p>{error}</p>

        <button
          type="button"
          onClick={() => setCurrentPage(1)}
          className="rounded-xl bg-[#91FF45] px-5 py-2 text-sm text-[#222222]"
        >
          بازگشت به صفحه اول
        </button>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section
        dir="rtl"
        className="py-20 text-center text-white/60"
      >
        مقاله‌ای برای نمایش وجود ندارد.
      </section>
    );
  }

  return (
    <section
      dir="rtl"
      className="mx-auto w-full max-w-[1600px] px-6 pb-16 pt-10"
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/Articles/${article.id}`}
            className="block w-full cursor-pointer"
          >
            <article className="w-full text-white transition-transform duration-200 hover:-translate-y-1">
              <FileContainer
                background="#303030"
                direction="rtl"
                radius="md"
                size="md"
                width="100%"
                height="190px"
                labelWidth="112px"
                labelHeight="34px"
                tagHeight="30px"
                classNames={{
                  base: "transition-colors duration-200",
                  innerLabel: "h-full p-0!",
                }}
                label={
                  <div className="flex h-full items-center justify-center">
                    <div className="mt-2 flex h-[27px] items-center justify-center gap-1 rounded-[10px] bg-white px-3 text-[11px] font-medium text-[#292929] shadow-[0_4px_12px_#FFFFFF33]">
                      <Clock3 size={12} />
                      <span>{article.estimated_reading_time}</span>
                    </div>
                  </div>
                }
                tag={
                  <div className="flex h-[25px] w-[42px] items-center justify-center rounded-lg bg-[#414141] text-white">
                    <ChevronLeft size={19} />
                  </div>
                }
              >
                <div className="h-full px-3 pt-[14px]">
                  <div className="h-[160px] w-full rounded-[20px] bg-[#444444]" />
                </div>
              </FileContainer>

              <div className="px-2 pt-4 text-right">
                <p className="text-[11px] text-white/45">
                  {formatDate(article.created_at)}
                </p>

                <h2 className="mt-4 text-[16px] font-semibold leading-7">
                  {article.title}
                </h2>

                <p className="mt-4 line-clamp-3 text-[12px] leading-7 text-white/50">
                  {article.caption}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-3" dir="ltr">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#303030] text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-11 min-w-11 rounded-xl px-3 text-[18px] font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#91FF45] text-[#222222]"
                    : "bg-[#303030] text-white/60 hover:bg-[#414141]"
                }`}
              >
                {page.toLocaleString("fa-IR")}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#303030] text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={20} className="rotate-180" />
          </button>
        </div>
      )}
    </section>
  );
}