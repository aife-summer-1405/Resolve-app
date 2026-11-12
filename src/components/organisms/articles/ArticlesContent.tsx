import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Clock3 } from "lucide-react";
import { getArticles } from "@/src/services/articleService";
import FileContainer from "../../Ui/FileContainer";
import { IArticlesResponse } from "@/src/types/ArticleType/ArticleType";

type Article = IArticlesResponse["data"][number];

export default async function ArticlesContent() {
  const response = await getArticles({
    page: 1,
    limit: 6,
    sort: "created_at",
    order: "DESC",
  });

  const articles = response.data;

  return (
    <main dir="rtl" className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
      <nav className="mb-5 flex items-center justify-start gap-2 text-[11px]">
        <Link href="/" className="text-white/40 transition hover:text-white">
          خانه
        </Link>

        <ChevronLeft size={12} className="text-white/40" />

        <span className="text-[#91FF45]">مقالات</span>
      </nav>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div className="relative flex min-h-[170px] items-center justify-between gap-6">
            <div className="min-w-0 flex-1 pt-3 text-right">
              <div className="mb-3 flex items-center gap-2 text-[12px] font-medium text-[#91FF45]">
                <Image
                  src="/icons/Group 34.png"
                  alt="فلش سبز"
                  width={50}
                  height={12}
                  className="h-auto w-[50px]"
                />

                <span>همیشه خودتو بروز نگه دار</span>
              </div>

              <h1 className="text-[24px] font-semibold leading-10 text-white">
                در بالاترین سطح دانش با مقالات دلتا
              </h1>

              <p className="mt-3 text-[12px] leading-7 text-white/70">
                در این قسمت می‌توانید بروزترین مقالات دنیای ملک و مکان‌های
                تفریحی را پیدا کنید و از جدیدترین مطالب ما لذت ببرید!
              </p>
            </div>

            <div className="relative h-[140px] w-[220px] shrink-0">
              <Image
                src="/images/Mask group.png"
                alt="مقالات دلتا"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {articles.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {articles.slice(2, 4).map((article) => (
            <ArticleCard key={article.id} article={article} large />
          ))}
        </div>
      </section>

      {articles.length > 4 && (
        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {articles.slice(4, 6).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              horizontal
            />
          ))}
        </section>
      )}
    </main>
  );
}

interface ArticleCardProps {
  article: Article;
  large?: boolean;
  horizontal?: boolean;
}

function ArticleCard({
  article,
  large = false,
  horizontal = false,
}: ArticleCardProps) {
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "fa-IR",
  );

  return (
    <Link
      href={`/Articles/${article.id}`}
      className="block h-full w-full"
    >
      <article className="h-full w-full cursor-pointer text-white">
        <FileContainer
          background="#303030"
          direction="rtl"
          radius="md"
          size="md"
          width="100%"
          height={large ? "230px" : horizontal ? "175px" : "180px"}
          labelWidth="112px"
          labelHeight="34px"
          tagHeight="30px"
          classNames={{
            base: "transition-colors duration-200",
            wrapperLabel: "transition-colors duration-200",
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
            <div
              className={`relative w-full overflow-hidden rounded-[20px] bg-[#444444] ${
                horizontal
                  ? "h-[125px]"
                  : large
                    ? "h-[185px]"
                    : "h-[125px]"
              }`}
            >
              <div className="absolute left-3 top-3 flex items-center justify-center rounded-lg">
                <Image
                  src="/images/Group 9949.png"
                  alt="مقاله منتخب"
                  width={50}
                  height={12}
                />
              </div>
            </div>
          </div>
        </FileContainer>

        <div className="px-2 pt-4 text-right">
          <p className="text-[11px] text-white/45">
            {formattedDate}
          </p>

          <h2 className="mt-4 text-[15px] font-semibold leading-7 text-white">
            {article.title}
          </h2>

          <p className="mt-4 line-clamp-4 text-[12px] leading-7 text-white/50">
            {article.caption}
          </p>
        </div>
      </article>
    </Link>
  );
}