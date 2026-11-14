import { getHouseById } from "@/src/services/getHouseById";
import { HouseReserveFlow } from "../../HouseReserveDetails/HouseReserveFlow";

interface IPageProps {
    params: Promise<{ id: string }>;
}

const HouseReserveDetails = async ({ params }: IPageProps) => {
    const { id } = await params;
    const result = await getHouseById(id);

    if (!result) {
        return <div>خانه مورد نظر یافت نشد.</div>;
    }
    return <HouseReserveFlow result={result}  />;
};

export default HouseReserveDetails; 