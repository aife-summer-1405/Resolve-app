import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import fa from "../messages/fa.json";
import en from "../messages/en.json";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const locale = savedLocale === "en" ? "en" : "fa";

  return {
    locale,
    messages: locale === "fa" ? fa : en,
  };
});
