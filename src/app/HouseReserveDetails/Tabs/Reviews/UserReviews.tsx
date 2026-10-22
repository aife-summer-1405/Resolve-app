import FolderBox from "@/src/components/Ui/FolderBox";
import AddReview from "./AddReview";
import { CalendarRange, ChevronLeft, Reply, Text } from "lucide-react";
import UserReviewList from "./UserReviewList";




const reviews = [
    {
        id: 1,
        name: "علی محمدی",
        date: "۲۵ شهریور ۱۴۰۵",
        rating: 5,
        comment:
            "اقامتگاه بسیار تمیز و مرتب بود. امکانات کاملی داشت و میزبان هم برخورد بسیار خوبی داشت. حتماً دوباره اینجا را انتخاب می‌کنم.",
    },
    {
        id: 2,
        name: "سارا احمدی",
        date: "۱۸ شهریور ۱۴۰۵",
        rating: 4,
        comment:
            "محیط اقامتگاه آرام و دلنشین بود. دسترسی به امکانات شهری هم مناسب بود. در مجموع تجربه خوبی داشتیم.",
    },
    {
        id: 3,
        name: "مهدی رضایی",
        date: "۱۰ شهریور ۱۴۰۵",
        rating: 5,
        comment:
            "همه‌چیز مطابق توضیحات بود. نظافت و کیفیت امکانات رضایت‌بخش بود و فرایند تحویل اقامتگاه به‌راحتی انجام شد.",
    },
];

const UserReviews = () => {

    return (
        <div dir="rtl" className="flex flex-col gap-10">
            <AddReview />
           <UserReviewList reviews={reviews}/>
        </div>
    )
};

export default UserReviews;