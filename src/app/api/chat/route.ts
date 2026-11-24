import { NextResponse } from "next/server";

// const MODEL = "baidu/ernie-5.5-flash-preview:free";
// const MODEL = "particle-ai/particle-1:free";
// const MODEL = "gemma-4-26b-a4b-it:free";
const MODEL = "google/gemini-2.5-flash";
const MAX_HOUSES = 30;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

const TRANSACTION_LABELS: Record<string, string> = {
  direct_purchase: "فروش",
  rental: "اجاره",
  reservation: "رزرو روزانه",
  mortgage: "رهن",
};

type IChatMessage = { role: "user" | "assistant"; content: string };

type IHouse = {
  id: string;
  title: string;
  address: string;
  price: string;
  capacity: number;
  rooms: number;
  transaction_type: string;
  categories?: { name?: string };
  tags?: string[];
};

let cache: { at: number; houses: IHouse[] } | null = null;
const CACHE_MS = 5 * 60 * 1000;

const getHouses = async (): Promise<IHouse[]> => {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.houses;

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/houses?page=1&limit=100`, 
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`status ${res.status}`);

    const data = await res.json();
    const list: IHouse[] = (data?.houses ?? []).filter(
      (h: IHouse) => h.title?.trim() && Number(h.price) > 0
    );

    cache = { at: Date.now(), houses: list };
    return list;
  } catch (error) {
    console.error("Houses fetch error:", error);
    return cache?.houses ?? [];
  }
};

const pickRelevant = (houses: IHouse[], question: string) => {
  const words = question
    .toLowerCase()
    .split(/[\s،,.؟?!]+/)
    .filter((w) => w.length >= 3);

  const scored = houses.map((h) => {
    const text = `${h.title} ${h.address} ${h.categories?.name ?? ""} ${(h.tags ?? []).join(" ")}`.toLowerCase();
    const score = words.reduce((sum, w) => sum + (text.includes(w) ? 1 : 0), 0);
    return { h, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_HOUSES)
    .map((s) => s.h);
};

const formatHouse = (h: IHouse) =>
  [
    `- ${h.title}`,
    h.address ? `آدرس: ${h.address}` : null,
    h.categories?.name ? `نوع: ${h.categories.name}` : null,
    `معامله: ${TRANSACTION_LABELS[h.transaction_type] ?? h.transaction_type}`,
    `قیمت: ${Number(h.price).toLocaleString("fa-IR")} تومان`,
    h.rooms ? `اتاق: ${h.rooms}` : null,
    h.capacity ? `ظرفیت: ${h.capacity} نفر` : null,
    SITE_URL ? `لینک: ${SITE_URL}/houses/${h.id}` : null, 
  ]
    .filter(Boolean)
    .join(" | ");

const buildSystemPrompt = (houses: IHouse[]) => `
تو «دستیار سفر» یک سایت رزرو اقامتگاه هستی.
فقط درباره سفر و گردشگری در ایران جواب بده: شهرها، جاذبه‌ها، بهترین فصل سفر،
غذاهای محلی، مسیر و برنامه‌ریزی سفر، حمل‌ونقل و اقامت.
اگر سوال بی‌ارتباط با سفر بود، مودبانه بگو فقط درباره سفر در ایران کمک می‌کنی.
جواب‌ها فارسی، کوتاه، دوستانه و مرتب باشند.
اگر از اطلاعاتی مثل قیمت یا ساعت کاری مطمئن نیستی، بگو ممکن است تغییر کرده باشد.

لیست اقامتگاه‌های موجود در همین سایت:
${houses.length ? houses.map(formatHouse).join("\n") : "(فعلاً اقامتگاهی در دسترس نیست)"}

قواعد استفاده از لیست:
- وقتی کاربر دنبال اقامتگاه است، فقط از همین لیست پیشنهاد بده.
- هیچ اقامتگاه، قیمت یا مشخصاتی خارج از این لیست نساز.
- اگر مورد مناسبی در لیست نبود، صادقانه بگو در سایت پیدا نشد.
- هنگام پیشنهاد، نام، قیمت و در صورت وجود لینک را بگو.
`;

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "کلید API تنظیم نشده است" }, { status: 500 });
  }

  let messages: IChatMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "پیامی ارسال نشده است" }, { status: 400 });
  }

  const input = messages.slice(-10).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content).slice(0, 1000),
  }));

  const lastUserMessage =
    [...input].reverse().find((m) => m.role === "user")?.content ?? "";

  const houses = pickRelevant(await getHouses(), lastUserMessage);

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": SITE_URL,
        "X-OpenRouter-Title": "Resolve",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt(houses) },
          ...input,
        ],
        temperature: 0.5, 
        max_tokens: 800,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("OpenRouter error:", res.status, errorData.slice(0, 500));

      const errorMessage =
        res.status === 429
          ? "تعداد درخواست‌ها زیاد است، کمی بعد دوباره تلاش کن."
          : res.status === 401
            ? "کلید API نامعتبر است."
            : "خطا در دریافت پاسخ از هوش مصنوعی.";

      return NextResponse.json({ error: errorMessage }, { status: 502 });
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "جوابی دریافت نشد.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json({ error: "خطا در ارتباط با سرور" }, { status: 502 });
  }
}