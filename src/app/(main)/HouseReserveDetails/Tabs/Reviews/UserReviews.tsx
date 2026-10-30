import AddReview from "./AddReview";
import UserReviewList from "./UserReviewList";

interface IPageProps {
    houseId: string;
}

const UserReviews = ({ houseId }: IPageProps) => {
    return (
        <div dir="rtl" className="flex flex-col gap-10">
            <AddReview houseId={houseId} />
            <UserReviewList houseId={houseId} />
        </div>
    );
};

export default UserReviews;