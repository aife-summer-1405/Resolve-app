import { MapPin, Ruler, BedDouble, Building2, Banknote } from "lucide-react";

export interface PropertyInfoData {
  title: string;
  location: string;
  area: number;
  rooms: number;
  floor: string;
  mortgage: number;
  rent: number;
}

interface PropertyInfoProps {
  property: PropertyInfoData;
}

export default function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <section dir="rtl" className="space-y-6 text-white">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">
          {property.title}
        </h1>

        <p className="mt-3 flex items-center gap-2 text-sm text-white/60">
          <MapPin size={18} />
          {property.location}
        </p>
      </div>
    </section>
  );
}
