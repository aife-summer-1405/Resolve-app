import type { IHouseDetails } from "@/src/types/HouseDetailType";

interface IAboutHouseProps {
  result: IHouseDetails;
}

const AboutHouse = ({ result }: IAboutHouseProps) => {
  return (
    <div dir="rtl" className="space-y-6 text-gray-300">
      <div>
        <h2 className="mb-3 text-lg font-semibold text-white">
          درباره اقامتگاه
        </h2>

        <p className="text-sm leading-8">
          {result.caption || "توضیحاتی برای این اقامتگاه ثبت نشده است."}
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-white">
          ویژگی‌های اقامتگاه
        </h2>

        <div className="flex flex-wrap gap-3">
          {result.tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="rounded-xl border border-neutral-600 bg-card px-4 py-2 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutHouse;
