"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Clock3 } from "lucide-react";
import FileContainer from "@/src/components/Ui/FileContainer";

const articles = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  title: "بهترین مناطق گردشگری در سال ۱۴۰۳؟",
  description:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
  date: "۱۲ مرداد ۱۴۰۱ - ۱۲:۳۳",
  duration: "۳۰ دقیقه",
}));

const ITEMS_PER_PAGE = 9;

export default function ArticlesList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);

  const currentArticles = articles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section
      dir="rtl"
      className="mx-auto w-full max-w-[1600px] px-6 pb-16 pt-10"
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentArticles.map((article) => (
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
                      <span>{article.duration}</span>
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
                  {article.date}
                </p>

                <h2 className="mt-4 text-[16px] font-semibold leading-7">
                  {article.title}
                </h2>

                <p className="mt-4 line-clamp-3 text-[12px] leading-7 text-white/50">
                  {article.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

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
    </section>
  );
}