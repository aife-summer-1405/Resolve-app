import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft, Heart, Share2 } from "lucide-react";

import PropertyImages from "@/src/components/organisms/MortgageDetails/PropertyImages";
import PropertyInfo from "@/src/components/organisms/MortgageDetails/PropertyInfo";
import ContactInfo from "@/src/components/organisms/MortgageDetails/ContactInfo";
import PropertyTabs from "@/src/components/organisms/MortgageDetails/PropertyTabs";
import SimilarHouses from "@/src/components/organisms/MortgageDetails/SimilarHouses";
import { getHouseById } from "@/src/services/getHouseById";

interface PropertyDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PropertyDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getHouseById(id).catch(() => null);

  return {
    title: result?.title ? `${result.title} | دلتا` : "جزئیات ملک | دلتا",
    description: result?.caption ?? "مشاهده جزئیات آگهی ملک",
  };
}

const similarProperties = [
  { id: 12, title: "آپارتمان دوخوابه", location: "تهران، شهرک غرب", image: "/images/hotel.jpg", area: 105, rooms: 2, mortgage: 650000000, rent: 12000000 },
  { id: 13, title: "آپارتمان نوساز", location: "تهران، پونک", image: "/images/hotel.jpg", area: 95, rooms: 2, mortgage: 500000000, rent: 10000000 },
  { id: 14, title: "واحد مسکونی دلباز", location: "تهران، جنت‌آباد", image: "/images/hotel.jpg", area: 130, rooms: 3, mortgage: 900000000, rent: 18000000 },
];

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params;

  const result = await getHouseById(id).catch(() => null);
  if (!result) notFound();

  return (
    <main dir="rtl" className="min-h-screen mt-10 text-white">
      <div className="mx-auto max-w-[1600px] space-y-5 px-5 py-5 lg:px-8">
        <nav dir="rtl" className="flex flex-wrap items-center gap-2 text-xs text-white/50">
          <span>خانه</span>
          <ChevronLeft size={13} />
          <span>رهن و اجاره</span>
          <ChevronLeft size={13} />
          <span>رهن و اجاره آپارتمان</span>
          <ChevronLeft size={13} />
          <span className="text-[#91FF45]">جزئیات ملک</span>
        </nav>

        <section dir="ltr" className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[210px_minmax(0,1fr)]">
          <div className="min-w-0">
            <ContactInfo result={result} />
          </div>
           <div className="min-w-0">
            <PropertyImages result={result} />
          </div> 
        </section> 

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button type="button" aria-label="افزودن به علاقه‌مندی‌ها"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#393939] text-white/70 transition hover:text-[#91FF45]">
                <Heart size={17} className={result.isFavorite ? "fill-[#91FF45] text-[#91FF45]" : ""} />
              </button>
              <button type="button" aria-label="اشتراک‌گذاری"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#393939] text-white/70 transition hover:text-white">
                <Share2 size={17} />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
              <span className="rounded-lg bg-[#8170FF] px-3 py-2 text-white">
                ★ {result.rate} ستاره
              </span>
              {result.tags.map((tag) => (
                <span key={tag} className="rounded-lg bg-[#393939] px-3 py-2 text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <PropertyInfo result={result} />

          <div className="rounded-xl px-4">
            <PropertyTabs result={result} />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-[#393939] px-4 py-3">
            <button type="button" className="text-xs text-[#91FF45] transition hover:text-white">
              مشاهده همه
            </button>
            <h2 className="text-sm font-semibold">آگهی‌های مشابه</h2>
          </div>
          <SimilarHouses properties={similarProperties} />
        </section>
      </div>
    </main>
  );
}