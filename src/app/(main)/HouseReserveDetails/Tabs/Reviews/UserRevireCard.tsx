
import { CalendarRange, ChevronLeft, Star } from "lucide-react";
import FileContainer from "@/src/components/Ui/FileContainer";
import UserReply from "./UserReply";
import type { IHouseComment } from "@/src/types/HousereservesType/HouseCommentsType";
import { useReplyStore } from "@/src/store/useReplyStore";

interface IUserReviewCardProps {
    review: IHouseComment;
    replies: IHouseComment[];
}

const UserRevireCard = ({ review, replies }: IUserReviewCardProps) => {
    const setReplyId = useReplyStore((state) => state.setReplyId);

    return (
        <div className="relative h-100">
            <FileContainer
                background="var(--card)"
                radius="md"
                size="lg"
                width="100%"
                height="calc(100% - 48px)"
                labelWidth="140px"
                labelHeight="48px"
                tagHeight="48px"
                direction="rtl"
                classNames={{
                   base: "transition-colors duration-200",
          wrapperLabel: "transition-colors duration-200",
          coverHollow: "transition-shadow duration-200",
          innerLabel: "h-full p-0!",
        
                }}
                label={
                    <div className="flex items-center justify-center gap-1 text-sm font-bold">
                        <Star size={14} fill="currentColor" />
                        <span>{review.rating}</span>
                    </div>
                }
                tag={
                    <div className="flex items-center gap-1 text-xs text-muted">
                        <CalendarRange size={14} />
                        <span>
                            {new Date(review.created_at).toLocaleDateString("fa-IR")}
                        </span>
                    </div>
                }
            >
                <div className="flex h-full flex-col justify-between p-4 text-right">
                    <p className="text-[16px]">{review.caption}</p>

                    <div className="flex items-center gap-2">
                        <div className="h-0.75 flex-1 bg-[linear-gradient(270deg,#FFFFFF_0%,rgba(255,255,255,0)_100%)]" />
                        <UserReply />
                    </div>

                    {replies && replies.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {replies.map((reply) => (
                                <div key={reply.id} className="flex flex-col">
                                    <div className="flex  items-center gap-2">
                                        <p className="text-[16px]">
                                            {reply.user.firstName} {reply.user.lastName}
                                        </p>

                                        <span>|</span>

                                        <div className="flex items-center gap-1">
                                            <p className="text-[13px] text-muted">
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

                    <div className="flex flex-col items-end justify-between gap-5 rounded-3xl bg-[#444444] p-3 md:flex-row md:gap-0">
                        <div className="flex  gap-4">
                            <div className="size-14.25 rounded-2xl bg-[#D9D9D9]" />

                            <div className="flex flex-col justify-between">
                                <p className="text-[16px]">
                                    {review.user.firstName} {review.user.lastName}
                                </p>

                                <div className="flex items-center gap-1">
                                    <p className="text-[13px] text-muted">
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
                            
                            <p className="text-[16px]">ثبت پاسخ</p>
                            <ChevronLeft size={13} />
                        </button>
                    </div>
                </div>
            </FileContainer>
        </div>
    );
};

export default UserRevireCard;
