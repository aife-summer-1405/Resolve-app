import {
    Wifi,
    CarFront,
    Snowflake,
    Tv,
    CookingPot,
    ShowerHead,
    Flame,
    WashingMachine,
} from "lucide-react";

const facilities = [
    { id: 1, title: "اینترنت رایگان", icon: Wifi },
    { id: 2, title: "پارکینگ", icon: CarFront },

];

const HouseFacilities = () => {
    return (
        <div dir="rtl" className="space-y-6">
         

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-7">
                {facilities.map(({ id, title, icon: Icon }) => (
                    <div
                        key={id}
                        className="flex flex-col items-center gap-3 rounded-xl border border-gray-700 bg-[#383838] p-5 text-center transition-colors hover:border-lime-400"
                    >
                              <span className="text-sm text-gray-200">{title}</span>
                       <span className="bg-[#7569FF] px-9 py-1 rounded-[10px]">دارد</span>
                  
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HouseFacilities;