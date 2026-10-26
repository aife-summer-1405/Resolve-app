import { MoveLeft } from "lucide-react";
import Image from "next/image";

const PropertyCategoriesSection = () => {
  const categories = [
    { label: "ملک ویلایی", icon: "/icons/v.png" },
    { label: "ملک کلبه", icon: "/icons/k.png" },
    { label: "بومگردی", icon: "/icons/B.png" },
    { label: "استخردار", icon: "/icons/A.png" },
    { label: "ملک ساحلی", icon: "/icons/k.png" },
    { label: "آپارتمان", icon: "/icons/p.png" },
  ];

  return (
    <section className="relative mb-30 w-full overflow-hidden px-5 pb-16 pt-30 text-white">
      <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-[#8CFF4552]/32 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-344 text-foreground">
        <div className="flex flex-col items-center text-center text-foreground">
          <div className="mb-3 flex items-center gap-3">
            <Image
              src="/icons/Group 33.png"
              alt="آیکن"
              width={48}
              height={16}
            />

            <span className="text-[16px] font-medium text-[#8CFF45]">
              دسته بندی املاک دلتا
            </span>

            <Image
              src="/icons/Group 34.png"
              alt="آیکن"
              width={48}
              height={16}
            />
          </div>

          <h2 className="text-[32px] font-medium leading-8 md:text-xl">
            هر ملکی بخوای اینجا پیدا میشه!
          </h2>

          <p className="mt-3 text-[12px] leading-6">
            با کلیک به روی هر دسته بندی می توانید تمام آگهی مربوط به آن را
            مشاهده کنید و به ملک مورد علاقه خود برسید.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto pb-3 scrollbar-hide">
          <div className="flex min-w-max items-center gap-4 px-1 pt-0">
            {categories.map((category) => (
              <div key={category.label} className="group relative h-22.25 w-53">
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-13.5 w-full items-center justify-center rounded-[10px] bg-[#303030] px-3 text-xs font-medium text-white transition-colors duration-200 group-hover:bg-[#8CFF45] group-hover:text-[#202020]"
                >
                  <span className="flex items-center gap-2 whitespace-nowrap text-[16px]">
                    <span>✦</span>
                    {category.label}
                    <span>✦</span>
                  </span>
                </button>

                <div className="pointer-events-none absolute right-2 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-[10px] bg-[#393939]/81 transition-colors duration-200 ">
                  <Image
                    src={category.icon}
                    alt={category.label}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>

                <MoveLeft
                  size={18}
                  className="pointer-events-none absolute left-0 top-4.5 text-white/70"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyCategoriesSection;
