import { Suspense } from "react";
import HouseDetailsContent from "./HouseDetailsContent";

interface IPageProps {
    params: Promise<{ id: string }>;
}

const HouseReserveDetails = ({ params }: IPageProps) => {
    return (
        <Suspense fallback={<div>در حال دریافت اطلاعات خانه...</div>}>
            <HouseDetailsContent params={params} />
        </Suspense>
    );
};

export default HouseReserveDetails;