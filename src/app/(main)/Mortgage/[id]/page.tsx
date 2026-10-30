import type { Metadata } from "next";
import { ChevronLeft, MapPin, Heart, Share2 } from "lucide-react";

import PropertyImages from "@/src/components/organisms/MortgageDetails/PropertyImages";
import PropertyInfo from "@/src/components/organisms/MortgageDetails/PropertyInfo";
import ContactInfo from "@/src/components/organisms/MortgageDetails/ContactInfo";
import PropertyTabs from "@/src/components/organisms/MortgageDetails/PropertyTabs";
import SimilarHouses from "@/src/components/organisms/MortgageDetails/SimilarHouses";

export const metadata: Metadata = {
  title: "جزئیات ملک | دلتا",
  description: "مشاهده جزئیات آگهی ملک",
};

interface PropertyDetailsPageProps {
  params: Promise<{ id: string }>;
}

const sampleProperty = {
  id: 11,
  title: "فروش آپارتمان ۱۲۶ متر در شهرک غرب",
  location: "مازندران، ساری، جاده دریا، نبش دنیای آرزو، ساختمان سپهر",
  area: 126,
  rooms: 2,
  floor: "طبقه سوم",
  mortgage: 800000000,
  rent: 15000000,
  images: ["/images/hotel.jpg"],
  ownerName: "محمدرضا ساداتی",
  phoneNumber: "09123456789",
  description:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چیدمان، اندازه و ساختار این متن صرفاً برای نمایش ظاهر صفحه استفاده شده است.",
  facilities: ["پارکینگ", "آسانسور", "انباری", "بالکن"],
};

const similarProperties = [
  {
    id: 12,
    title: "آپارتمان دوخوابه",
    location: "تهران، شهرک غرب",
    image: "/images/hotel.jpg",
    area: 105,
    rooms: 2,
    mortgage: 650000000,
    rent: 12000000,
  },
  {
    id: 13,
    title: "آپارتمان نوساز",
    location: "تهران، پونک",
    image: "/images/hotel.jpg",
    area: 95,
    rooms: 2,
    mortgage: 500000000,
    rent: 10000000,
  },
  {
    id: 14,
    title: "واحد مسکونی دلباز",
    location: "تهران، جنت‌آباد",
    image: "/images/hotel.jpg",
    area: 130,
    rooms: 3,
    mortgage: 900000000,
    rent: 18000000,
  },
];

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params;

  return (
    <main dir="" className="min-h-screen mt-10 bg-[#222222] text-white">
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

        <section
          dir="ltr"
          className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[210px_minmax(0,1fr)]"
        >
          {/* کارت تماس در سمت چپ */}
          <div className="min-w-0">
            <ContactInfo
              ownerName={sampleProperty.ownerName}
              phoneNumber={sampleProperty.phoneNumber}
            />
          </div>

          <div className="min-w-0">
            <PropertyImages />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="افزودن به علاقه‌مندی‌ها"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#393939] text-white/70 transition hover:text-[#91FF45]"
              >
                <Heart size={17} />
              </button>

              <button
                type="button"
                aria-label="اشتراک‌گذاری"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#393939] text-white/70 transition hover:text-white"
              >
                <Share2 size={17} />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
              <span className="rounded-lg bg-[#8170FF] px-3 py-2 text-white">
                ★ ۵ ستاره
              </span>              
              <span className="rounded-lg bg-[#393939] px-3 py-2 text-white/70">
                خانه آپارتمانی
              </span>
              <span className="rounded-lg bg-[#393939] px-3 py-2 text-white/70">
                خانه رهن و اجاره
              </span>
              <span className="rounded-lg bg-[#393939] px-3 py-2 text-white">
                خونه مدرن
              </span>              
            </div>
          </div>

        </section>

        <section className="space-y-5">
          <PropertyInfo property={sampleProperty} />

          <div className="rounded-xl bg-[#393939] px-4">
            <PropertyTabs
              description={sampleProperty.description}
              facilities={sampleProperty.facilities}
              address={sampleProperty.location}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-[#393939] px-4 py-3">
            <button
              type="button"
              className="text-xs text-[#91FF45] transition hover:text-white"
            >
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
