import { IHouseDetails } from "@/src/types/HousereservesType/HouseDetailType";
import HeaderSlider from "./Slider";
interface IHeader {
  result: IHouseDetails;
}

const Header = ({ result }: IHeader) => {
  return (
    <div className=" mt-25  px-4 text-right  space-y-5 ">
      <div className=""></div>
      <h1 className="font-bold text-xl md:text-4xl">{result.title}</h1>
      <div className="flex items-center gap-1">
        <p className="text-[#AAAAAA]">آدرس</p>
        <p>{result.address}</p>
      </div>

      <HeaderSlider result={result} />
    </div>
  );
};

export default Header;
