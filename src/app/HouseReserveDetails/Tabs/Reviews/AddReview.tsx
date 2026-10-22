"use client";

import { Slider } from "@/components/ui/slider";
import Field from "@/src/components/Ui/Field";
import { useReplyStore } from "@/src/store/useReplyStore";
import { ChevronLeft, Star } from "lucide-react";
import { useState } from "react";

const AddReview = () => {
    const [rating, setRating] = useState<number[]>([4.5]);
    const replyId = useReplyStore((s) => s.replyId);
    const clearReply = useReplyStore((s) => s.clearReply);

    return (
        <>
            {!replyId && (
                <div
                    className="flex flex-col gap-10 border-b-[3px] pb-10"
                    style={{
                        borderImageSource:
                            "linear-gradient(270deg, rgba(170, 170, 170, 0) 0%, #565656 45.5%, rgba(170, 170, 170, 0) 100%)",
                        borderImageSlice: 1,
                    }}
                >
                    <div className="flex flex-row gap-2">
                        <div className="w-1/4">
                            <Field legend="نام">
                                <input
                                    type="text"
                                    placeholder="نام را وارد کنید"
                                    className="w-full bg-transparent outline-none"
                                />
                            </Field>
                        </div>

                        <div className="w-1/4">
                            <Field legend="ایمیل">
                                <input
                                    type="email"
                                    placeholder="ایمیل را وارد کنید"
                                    className="w-full bg-transparent outline-none"
                                />
                            </Field>
                        </div>

                        <div className="w-2/4">
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
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-full">
                            <Field legend="متن نظر">
                                <input
                                    type="text"
                                    placeholder="نظر خود را بنویسید"
                                    className="w-full bg-transparent outline-none"
                                />
                            </Field>
                        </div>

                        <button
                            type="button"
                            className="flex w-28 items-center justify-center rounded-[10px] bg-green px-4 py-2 text-[12px] text-black"
                        >
                            <p>ارسال نظر</p>
                            <span>
                                <ChevronLeft size={11} />
                            </span>
                        </button>
                    </div>
                </div>
            )}

            {replyId && <div
                className="flex flex-col gap-10 border-b-[3px] pb-10"
                style={{
                    borderImageSource:
                        "linear-gradient(270deg, rgba(170, 170, 170, 0) 0%, #565656 45.5%, rgba(170, 170, 170, 0) 100%)",
                    borderImageSlice: 1,
                }}
            >
                <div className="flex flex-row gap-2">
                    <div className="w-1/4">
                        <Field legend="نام">
                            <input
                                type="text"
                                placeholder="نام را وارد کنید"
                                className="w-full bg-transparent outline-none"
                            />
                        </Field>
                    </div>

                    <div className="w-1/4">
                        <Field legend="ایمیل">
                            <input
                                type="email"
                                placeholder="ایمیل را وارد کنید"
                                className="w-full bg-transparent outline-none"
                            />
                        </Field>
                    </div>

                    <div className="w-2/4">
                        <Field legend="برای نظر  ">
                            <div className="flex w-full flex-row-reverse items-center gap-4 rounded-xl">

                                <input
                                    type="email"
                                    placeholder=" نظر  "
                                    className="w-full bg-transparent outline-none"
                                />
                            </div>
                        </Field>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-full">
                        <Field legend="متن نظر">
                            <input
                                type="text"
                                placeholder="نظر خود را بنویسید"
                                className="w-full bg-transparent outline-none"
                            />
                        </Field>
                    </div>

                    <button
                    onClick={clearReply}
                        type="button"
                        className="flex w-28 items-center justify-center rounded-[10px] bg-green px-4 py-2 text-[12px] text-black"
                    >
                        <p>ارسال نظر</p>
                        <span>
                            <ChevronLeft size={11} />
                        </span>
                    </button>
                </div>
            </div>}
        </>
    );
};

export default AddReview;