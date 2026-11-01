import { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import { MapPin } from "lucide-react";

interface PropertyInfoProps {
  result: IHouseDetails;
}

export default function PropertyInfo({ result }: PropertyInfoProps) {
  return (
    <section dir="rtl" className="space-y-6 text-white">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">{result.title}</h1>

        <p className="mt-3 flex items-center gap-2 text-sm text-white/60">
          <MapPin size={18} />
          {result.address}
        </p>
      </div>
    </section>
  );
}