import { IHouseCommentsResponse } from "@/src/types/HouseCommentsType";
import AddReview from "./AddReview";
import UserReviewList from "./UserReviewList";

interface IPageProps {
    reviews: IHouseCommentsResponse;
    houseId: string;
}

const UserReviews = ({ reviews,houseId }: IPageProps) => {
    return (
        <div dir="rtl" className="flex flex-col gap-10">
            <AddReview houseId={houseId} />
            <UserReviewList reviews={reviews} />
        </div>
    );
};

export default UserReviews;