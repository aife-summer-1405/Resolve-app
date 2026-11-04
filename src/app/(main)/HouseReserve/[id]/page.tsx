import { getHouseById } from "@/src/services/getHouseById";
import { HouseReserveFlow } from "../../HouseReserveDetails/HouseReserveFlow";

interface IPageProps {
    params: Promise<{ id: string }>;
}

const HouseReserveDetails = async ({ params }: IPageProps) => {
    const { id } = await params;
    const result = await getHouseById(id);

    return <HouseReserveFlow result={result} />;
};

export default HouseReserveDetails;