"use client";

import { Slider } from "@/components/ui/slider";
import Field from "@/src/components/Ui/Field";
import { useReplyStore } from "@/src/store/useReplyStore";
import { ChevronLeft, Star } from "lucide-react";
import { useState } from "react";
import { useCreateComment } from "@/src/hooks/useCreateComment";

interface IAddReviewProps {
    houseId: string;
}

const AddReview = ({ houseId }: IAddReviewProps) => {
    const [rating, setRating] = useState<number[]>([4.5]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");

    const replyId = useReplyStore((s) => s.replyId);
    const clearReply = useReplyStore((s) => s.clearReply);

    const { mutate, isPending, isError } = useCreateComment(houseId);
    const resetForm = () => {
        setName("");
        setEmail("");
        setTitle("");
        setCaption("");
        setRating([4.5]);
    };
const handleSubmit = () => {
    if (!caption.trim()) return;

    mutate(
        {
            house_id: Number(houseId),
            title: title.trim() || "نظر کاربر",
            caption: caption.trim(),
            rating: replyId ? 5 : rating[0],
            parent_comment_id: replyId ? Number(replyId) : null,
        },
        {
            onSuccess: () => {
                resetForm();
                clearReply();
            },
        }
    );
};
    return (
        <div
            className="flex flex-col gap-10 border-b-[3px] pb-10"
            style={{
                borderImageSource:
                    "linear-gradient(270deg, rgba(170, 170, 170, 0) 0%, #565656 45.5%, rgba(170, 170, 170, 0) 100%)",
                borderImageSlice: 1,
            }}
        >
            {replyId ? (
                <div className="  md:hidden">
                    <Field legend="برای نظر">
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="عنوان پاسخ"
                            className="w-full bg-transparent outline-none"
                        />
                    </Field>
                </div>
            ) : (
                <div className="  md:hidden">
                    <Field legend="امتیاز شما">
                        <div className="flex w-full flex-row-reverse items-center gap-4 rounded-xl">
                            <div className="flex flex-row-reverse items-center gap-1">
                                <Star className="size-4 fill-current" />
                                <span>{rating[0]}</span>
                            </div>

                            <Slider
                                dir="rtl"
                                min={0}
                                max={5}
                                step={0.5}
                                value={rating}
                                onValueChange={setRating}
                                className="w-full"
                            />
                        </div>
                    </Field>
                </div>
            )}
            <div className="flex flex-row gap-2">
                <div className="w-2/4 md:w-1/4">
                    <Field legend="نام">
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="نام را وارد کنید"
                            className="w-full bg-transparent outline-none"
                        />
                    </Field>
                </div>

                <div className="w-2/4 md:w-1/4">
                    <Field legend="ایمیل">
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="ایمیل را وارد کنید"
                            className="w-full bg-transparent outline-none"
                        />
                    </Field>
                </div>

                {replyId ? (
                    <div className="w-2/4 hidden md:block">
                        <Field legend="برای نظر">
                            <input
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="عنوان پاسخ"
                                className="w-full bg-transparent outline-none"
                            />
                        </Field>
                    </div>
                ) : (
                    <div className="w-2/4 hidden md:block">
                        <Field legend="امتیاز شما">
                            <div className="flex w-full flex-row-reverse items-center gap-4 rounded-xl">
                                <div className="flex flex-row-reverse items-center gap-1">
                                    <Star className="size-4 fill-current" />
                                    <span>{rating[0]}</span>
                                </div>

                                <Slider
                                    dir="rtl"
                                    min={0}
                                    max={5}
                                    step={0.5}
                                    value={rating}
                                    onValueChange={setRating}
                                    className="w-full"
                                />
                            </div>
                        </Field>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="w-full">
                    <Field legend="متن نظر">
                        <input
                            type="text"
                            value={caption}
                            onChange={(event) => setCaption(event.target.value)}
                            placeholder={
                                replyId
                                    ? "پاسخ خود را بنویسید"
                                    : "نظر خود را بنویسید"
                            }
                            className="w-full bg-transparent outline-none"
                        />
                    </Field>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isPending || !caption.trim()}
                    className="flex w-28 items-center justify-center rounded-[10px] bg-green px-4 py-2 text-[12px] text-black disabled:opacity-50"
                >
                    <p>{isPending ? "در حال ارسال..." : "ارسال نظر"}</p>
                    <ChevronLeft size={11} />
                </button>
            </div>
        </div>
    );
};

export default AddReview;