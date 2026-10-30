"use client";

import { useState } from "react";
import { Star, ChevronLeft } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function ReviewForm() {
  const [rating, setRating] = useState<number[]>([4.5]);
  const [fullName, setFullName] = useState("محمد رضا ساداتی");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;

    setMessage("");
  };

  return (
    <form
      dir="ltr"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-7 border-b border-white/10 pb-7"
    >
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_155px_155px]">
        <div className="flex h-[40px] items-center gap-4 rounded-xl border border-white/50 px-3">
          <div className="flex shrink-0 items-center gap-1 text-sm">
            <Star size={14} className="fill-current" />
            <span>{rating[0].toLocaleString("fa-IR")}</span>
          </div>

          <Slider
            dir="rtl"
            min={0}
            max={5}
            step={0.5}
            value={rating}
            onValueChange={setRating}
            aria-label="امتیاز شما"
            className="flex-1"
          />
        </div>
        <label className="flex h-[40px] items-center rounded-xl border border-white/50 px-3">
          <span className="sr-only">ایمیل شما</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ایمیل شما"
            className="w-full bg-transparent text-right text-xs outline-none placeholder:text-white/60"
          />
        </label>

        <label className="flex h-[40px] items-center rounded-xl border border-white/50 px-3">
          <span className="sr-only">نام و نام خانوادگی</span>
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="نام و نام خانوادگی"
            className="w-full bg-transparent text-right text-xs outline-none placeholder:text-white/60"
          />
        </label>
      </div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex h-[40px] shrink-0 items-center justify-center gap-1 rounded-lg bg-[#91FF45] px-4 text-xs font-medium text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>ارسال نظر</span>
          <ChevronLeft size={14} />
        </button>

        <label className="flex h-[40px] min-w-0 flex-1 items-center rounded-xl border border-white/50 px-3">
          <span className="sr-only">پیام شما</span>
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="پیام شما"
            className="w-full bg-transparent text-right text-xs outline-none placeholder:text-white/60"
          />
        </label>
      </div>
    </form>
  );
}