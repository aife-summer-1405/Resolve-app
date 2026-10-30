

export interface SimilarProperty {
  id: number;
  title: string;
  location: string;
  image: string;
  area: number;
  rooms: number;
  mortgage: number;
  rent: number;
}

interface SimilarHousesProps {
  properties: SimilarProperty[];
}

export default function SimilarHouses({
  properties,
}: SimilarHousesProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <section dir="rtl" className="w-full text-white">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        fgyhujiop[98yt7fyvhbj]
      </div>
    </section>
  );
}
