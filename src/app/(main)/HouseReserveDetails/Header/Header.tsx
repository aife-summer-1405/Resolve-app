import { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import HeaderSlider from "./Slider";
import { Copy, Heart, Share, Share2, Star } from "lucide-react";
import HeaderButtons from "./HeaderButtons";
interface IHeader {
  result: IHouseDetails;
}

const Header = ({ result }: IHeader) => {
  return (
    <div className=" mt-25  px-4 text-right  space-y-5 ">
      <h1 className="font-bold text-xl md:text-4xl">{result.title}</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <p className="text-[#AAAAAA]">آدرس</p>
          <p>{result.address}</p>
        </div>
        <div className="flex gap-2 ">
          <div className="flex border-l border-gray-400 px-1">
            <div className="flex items-center gap-1 bg-timer p-1 rounded-md">

              <Star size={14} fill="currentColor" />
              <span className="pt-1" >{result.rate}</span>
            </div>

          </div>
      <HeaderButtons  isFavo={result.isFavorite} />
        </div>

      </div>


      <HeaderSlider result={result} />
    </div>
  );
};

export default Header;
