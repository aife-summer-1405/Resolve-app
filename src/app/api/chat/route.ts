
import { NextResponse } from "next/server";

const MODEL = "baidu/ernie-5.5-flash-preview:free";
const SYSTEM_PROMPT = `
تو «دستیار سفر» یک سایت رزرو اقامتگاه هستی.
فقط درباره سفر و گردشگری در ایران جواب بده: شهرها، جاذبه‌ها، بهترین فصل سفر،
غذاهای محلی، مسیر و برنامه‌ریزی سفر، حمل‌ونقل و اقامت.
اگر سوال بی‌ارتباط با سفر بود، مودبانه بگو فقط درباره سفر در ایران کمک می‌کنی.
جواب‌ها فارسی، کوتاه، دوستانه و مرتب باشند.
اگر از اطلاعاتی مثل قیمت یا ساعت کاری مطمئن نیستی، بگو ممکن است تغییر کرده باشد.
`;

type IChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "کلید API تنظیم نشده است" },
      { status: 500 }
    );
  }

  let messages: IChatMessage[];

  try {
    ({ messages } = await req.json());
  } catch {
    return NextResponse.json(
      { error: "درخواست نامعتبر است" },
      { status: 400 }
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "پیامی ارسال نشده است" },
      { status: 400 }
    );
  }

  const input = messages.slice(-10).map((message) => ({
    role: message.role,
    content: String(message.content).slice(0, 1000),
  }));

  try {
    const res = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "",
          "X-OpenRouter-Title": "Resolve",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            ...input,
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.text();

      console.error("OpenRouter error:", res.status, errorData);

      const errorMessage =
        res.status === 429
          ? "تعداد درخواست‌ها زیاد است، کمی بعد دوباره تلاش کن."
          : res.status === 401
            ? "کلید API نامعتبر است."
            : "خطا در دریافت پاسخ از هوش مصنوعی.";

      return NextResponse.json(
        { error: errorMessage },
        { status: 502 }
      );
    }

    const data = await res.json();
console.log("OpenRouter response:", data);
    const reply =
      data?.choices?.[0]?.message?.content ||
      "جوابی دریافت نشد.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);

    return NextResponse.json(
      { error: "خطا در ارتباط با سرور" },
      { status: 502 }
    );
  }
}
