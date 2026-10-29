
import FolderBox from "@/src/components/Ui/FolderBox";
import { CalendarRange, ChevronLeft, Star } from "lucide-react";
import UserReply from "./UserReply";
import type { IHouseComment } from "@/src/types/HouseCommentsType";
import { useReplyStore } from "@/src/store/useReplyStore";

interface IUserReviewCardProps {
    review: IHouseComment;
    replies: IHouseComment[];
}

const UserRevireCard = ({ review, replies }: IUserReviewCardProps) => {
    const setReplyId = useReplyStore((state) => state.setReplyId);

    return (
        <div className="relative">
            <div className="absolute right-3 top-1 z-10 flex h-7 items-center gap-1 rounded-lg bg-white px-2 text-xs font-bold text-card">
                <Star size={13} fill="currentColor" />
                <span>{review.rating}</span>
            </div>

            <FolderBox className="h-full" contentClassName="w-full px-4 py-4">
                <div className="flex flex-col gap-4 text-right">
                    <p className="text-[16px]">{review.caption}</p>

                    <div className="flex items-center gap-2">
                        <div className="h-0.75 flex-1 bg-[linear-gradient(270deg,#FFFFFF_0%,rgba(255,255,255,0)_100%)]" />
                        <UserReply />
                    </div>

                    {replies && replies.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {replies.map((reply) => (
                                <div key={reply.id} className="flex flex-col">
                                    <div className="flex flex-row-reverse items-center gap-2">
                                        <p className="text-[16px]">
                                            {reply.user.firstName} {reply.user.lastName}
                                        </p>

                                        <span>|</span>

                                        <div className="flex items-center gap-1">
                                            <p className="text-[13px] text-[#AAAAAA]">
                                                {new Date(reply.created_at).toLocaleDateString("fa-IR")}
                                            </p>
                                            <CalendarRange size={16} />
                                        </div>
                                    </div>

                                    <p>{reply.caption}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col items-end justify-between gap-5 rounded-3xl bg-[#444444] p-3 md:flex-row-reverse md:gap-0">
                        <div className="flex flex-row-reverse gap-4">
                            <div className="size-14.25 rounded-2xl bg-[#D9D9D9]" />

                            <div className="flex flex-col justify-between">
                                <p className="text-[16px]">
                                    {review.user.firstName} {review.user.lastName}
                                </p>

                                <div className="flex items-center gap-1">
                                    <p className="text-[13px] text-[#AAAAAA]">
                                        {new Date(review.created_at).toLocaleDateString("fa-IR")}
                                    </p>
                                    <CalendarRange size={16} />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setReplyId(String(review.id))}
                            type="button"
                            className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2 text-white"
                        >
                            <ChevronLeft size={13} />
                            <p className="text-[16px]">ثبت پاسخ</p>
                        </button>
                    </div>
                </div>
            </FolderBox>
        </div>
    );
};

export default UserRevireCard;
