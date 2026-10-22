import FolderBox from "@/src/components/Ui/FolderBox";
import { ArrowLeft, CalendarRange, ChevronLeft, Star, Text } from "lucide-react";
import UserReply from "./UserReply";

export interface UserReviewCardProps {
    id: number;
    name: string;
    date: string;
    rating: number;
    comment: string;
}

const UserRevireCard = ({ name, date, comment }: UserReviewCardProps) => {
    return (
        <div className="relative">

            <div className="absolute right-3 top-1 z-10 flex h-7 items-center gap-1 rounded-lg bg-white px-2 text-xs font-bold text-card">
                <Star size={13} fill="currentColor" />
                <span>4.5</span>
            </div>
            <FolderBox className="h-full" contentClassName="w-full px-4 py-4">
                <div className="flex flex-col gap-4 text-right">
                    <p className="text-[16px]">{comment}</p>

                    <div className="flex items-center gap-2">
                        <div className="h-0.75 flex-1 bg-[linear-gradient(270deg,#FFFFFF_0%,rgba(255,255,255,0)_100%)]" />

                       <UserReply/>
                    </div>

                    <div className="flex flex-row-reverse items-center gap-2">
                        <p className="text-[16px]">{name}</p>
                        <span>|</span>

                        <div className="flex items-center gap-1">
                            <p className="text-[13px] text-[#AAAAAA]">{date}</p>
                            <CalendarRange size={16} />
                        </div>
                    </div>

                    <p className="text-[16px]">{comment}</p>

                    <div className="flex flex-row-reverse items-end justify-between rounded-3xl bg-[#444444] p-3">
                        <div className="flex flex-row-reverse gap-4">
                            <div className="size-14.25 rounded-2xl bg-[#D9D9D9]" />

                            <div className="flex flex-col justify-between">
                                <p className="text-[16px]">{name}</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-[13px] text-[#AAAAAA]">{date}</p>
                                    <CalendarRange size={16} />
                                </div>
                            </div>
                        </div>

                        <button className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2 text-white">
                            <span>
                                <ChevronLeft size={13} />
                            </span>
                            <p className="text-[16px]">ثبت پاسخ</p>
                        </button>
                    </div>
                </div>
            </FolderBox>
        </div>
    );
};

export default UserRevireCard;