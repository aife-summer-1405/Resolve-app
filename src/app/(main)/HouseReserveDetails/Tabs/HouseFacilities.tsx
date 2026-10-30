import type { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import {
  CarFront,
  Bath,
  Users,
  BedDouble,
  Trees,
  Building2,
} from "lucide-react";

interface IHouseFacilitiesProps {
  result: IHouseDetails;
}

const HouseFacilities = ({ result }: IHouseFacilitiesProps) => {
  const facilities = [
    {
      id: "parking",
      title: "پارکینگ",
      value: result.parking ? `${result.parking} خودرو` : "ندارد",
      icon: CarFront,
    },
    {
      id: "bathrooms",
      title: "سرویس بهداشتی",
      value: result.bathrooms ? `${result.bathrooms} عدد` : "ندارد",
      icon: Bath,
    },
    {
      id: "capacity",
      title: "ظرفیت مسافران",
      value: result.capacity ? `${result.capacity} نفر` : "مشخص نشده",
      icon: Users,
    },
    {
      id: "rooms",
      title: "تعداد اتاق‌ها",
      value: result.rooms ? `${result.rooms} اتاق` : "مشخص نشده",
      icon: BedDouble,
    },
    {
      id: "yard",
      title: "نوع حیاط",
      value:
        result.yard_type === "private"
          ? "اختصاصی"
          : result.yard_type === "shared"
            ? "مشترک"
            : "مشخص نشده",
      icon: Trees,
    },
    {
      id: "property",
      title: "نوع اقامتگاه",
      value:
        result.categories?.name === "villa"
          ? "ویلا"
          : result.categories?.name === "apartment"
            ? "آپارتمان"
            : result.categories?.name || "مشخص نشده",
      icon: Building2,
    },
  ];

  return (
    <div dir="rtl" className="space-y-6">
      <h2 className="text-lg font-semibold text-white">
        امکانات و مشخصات اقامتگاه
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {facilities.map(({ id, title, value, icon: Icon }) => (
          <div
            key={id}
            className="flex flex-col items-center gap-3 rounded-xl border border-gray-700 bg-card p-5 text-center transition-colors hover:border-primary"
          >
            <Icon size={28} className="text-primary" />

            <span className="text-sm text-gray-200">{title}</span>

            <span className="w-full rounded-[10px] bg-timer px-2 py-2 text-sm text-white">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HouseFacilities;
