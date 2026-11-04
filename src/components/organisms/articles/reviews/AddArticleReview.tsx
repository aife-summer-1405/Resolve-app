"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import Field from "@/src/components/Ui/Field";
import { ChevronLeft, Star } from "lucide-react";

export default function AddArticleReview() {
  const [rating, setRating] = useState<number[]>([4.5]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [caption, setCaption] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <div className="text-right">
        <p className="mb-5 text-xs font-medium text-[#91FF45]">
          ▸ ▸ ▸ نظر کاربران
        </p>

        <h2 className="text-xl font-semibold">
          رضایت شما اعتبار و ارزش دلتا را می‌سازد!
        </h2>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-3">
        <Field legend="نام و نام خانوادگی">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="وارد کنید ..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </Field>

        <Field legend="ایمیل شما">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل خود را وارد کنید"
            className="w-full bg-transparent text-sm outline-none"
          />
        </Field>

        <Field legend="امتیاز شما">
          <div className="flex items-center gap-4">
            <div className="flex shrink-0 items-center gap-1">
              <Star size={15} fill="currentColor" />
              <span>{rating[0].toLocaleString("fa-IR")}</span>
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

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="w-full">
          <Field legend="نظر شما">
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="نظر خود را بنویسید ..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </Field>
        </div>

        <button
          type="button"
          disabled={!caption.trim()}
          className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#91FF45] px-5 text-xs text-black transition hover:bg-[#7ce832] disabled:opacity-50"
        >
          <ChevronLeft size={14} />
          ارسال پیام
        </button>
      </div>
    </div>
  );
}