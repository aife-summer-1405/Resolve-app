import {
  ChevronLeft,
  CalendarDays,
  Copy,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ArticleReviews from "./reviews/ArticleReviews";
import { getArticleById } from "@/src/services/articleService";

interface ArticleDetailsProps {
  id: string;
}

export default async function ArticleDetails({ id }: ArticleDetailsProps) {
  const article = await getArticleById(id);

  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "fa-IR",
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen w-full px-4 py-5 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <nav className="mb-7 flex items-center gap-2 text-[11px] text-white/40">
          <Link href="/" className="transition hover:text-white">
            خانه
          </Link>
          <ChevronLeft size={13} />
          <Link href="/Articles" className="transition hover:text-white">
            مقالات
          </Link>
          <ChevronLeft size={13} />
          <span className="text-[#91FF45]">{article.title}</span>
        </nav>

        <section
          dir="ltr"
          className="mb-8 grid grid-cols-1 items-center gap-6 lg:grid-cols-[330px_1fr] lg:gap-8"
        >
          <div className="order-2 flex h-[84px] items-center justify-between rounded-[24px] bg-[#303030] px-4 lg:order-1">
            <div className="mr-2 flex shrink-0 flex-col gap-2">
              <button
                type="button"
                aria-label="کپی لینک مقاله"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#454545] transition hover:bg-[#91FF45] hover:text-black"
              >
                <Copy size={15} />
              </button>

              <button
                type="button"
                aria-label="اشتراک گذاری مقاله"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#454545] transition hover:bg-[#91FF45] hover:text-black"
              >
                <Share2 size={15} />
              </button>
            </div>

            <div className="flex min-w-0 items-center gap-3">
              <div className="min-w-0">
                <p className="ml-5 truncate text-[13px] font-medium">
                  نویسنده شماره {article.author_id}
                </p>

                <div className="mt-3 flex items-center gap-2 text-[10px] text-white/60">
                  <span>
                    {formattedDate} - {article.estimated_reading_time} زمان
                    برای خواندن
                  </span>
                  <CalendarDays size={13} />
                </div>
              </div>
            </div>

            <div className="h-[58px] w-[58px] shrink-0 rounded-full">
              <Image
                src="/images/Ellipse 41.png"
                alt="عکس نویسنده"
                width={60}
                height={12}
                className="absolute -mt-8 ml-5 h-auto"
              />
            </div>
          </div>

          <div className="order-1 text-right lg:order-2">
            <h1 className="text-xl font-bold leading-[1.9] sm:text-2xl lg:text-[27px]">
              {article.title}
            </h1>

            <p className="mt-2 text-xs leading-7 text-white/75 sm:text-[13px]">
              {article.caption}
            </p>
          </div>
        </section>

        <div className="relative mb-6 h-[210px] w-full overflow-hidden rounded-[35px] sm:h-[290px] lg:h-[360px]">
          <Image
            src="/images/Rectangle 6641.png"
            alt="عکس مقاله"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <article className="w-full text-right">
          <h2 className="mb-4 text-lg font-bold sm:text-xl">
            {article.title}
          </h2>

          <div className="space-y-2 text-xs leading-[2.5] text-white/90 sm:text-[13px]">
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است. لورم ایپسوم متن ساختگی با تولید
              سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
            </p>
            <p>
              صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم متن
              ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
              گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
              که لازم است.
            </p>
            <p>
              متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است. لورم
              ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است.
            </p>
          </div>

          <div
            dir="ltr"
            className="my-8 grid grid-cols-1 items-center gap-6 lg:grid-cols-2"
          >
            <div className="order-2 space-y-2 text-right text-xs leading-[2.8] text-white/90 sm:text-[13px] lg:order-1">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                مجله در ستون و سطرآنچنان که لازم است.
              </p>
              <p>
                متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است. لورم
                ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است.
              </p>
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. متون بلکه روزنامه و مجله در ستون
                و سطرآنچنان که لازم است.
              </p>
              <p>
                صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم متن
                ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
                طراحان گرافیک است.
              </p>
              <p>
                چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                است.
              </p>
            </div>

            <div className="relative order-1 h-[230px] w-full overflow-hidden rounded-[40px] sm:h-[290px] lg:order-2 lg:h-[290px]">
              <Image
                src="/images/Rectangle 6642.png"
                alt="تصویر مقاله"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-2 text-xs leading-[2.5] text-white/90 sm:text-[13px]">
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. متون بلکه روزنامه و مجله در ستون و
              سطرآنچنان که لازم است.
            </p>
            <p>
              صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم متن
              ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
              طراحان گرافیک است.
            </p>
            <p>
              متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است. لورم
              ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است.
            </p>
          </div>
        </article>
      </div>

      <ArticleReviews />
    </main>
  );
}