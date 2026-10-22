import { IHouseDetails } from "@/src/types/HouseDetailType";
import HeaderSlider from "./Slider";
interface IHeader{
    result: IHouseDetails;
}

const Header = ({ result }: IHeader) => {
    return (
        <div className="mx-auto mt-10  px-4 text-right  space-y-5 ">
            <h1 className="font-bold text-4xl">{result.title}</h1>
            <div className="flex flex-row-reverse items-center gap-1">
                <p className="text-[#AAAAAA]">: آدرس</p>
                 <p>{result.address}</p>
            </div>
          
            <HeaderSlider result={result} />
        </div>
    );
};

export default Header;