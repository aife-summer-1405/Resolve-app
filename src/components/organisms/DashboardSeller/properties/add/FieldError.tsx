"use client";

import { useTranslations } from "next-intl";

export const FieldError = ({ message }: { message?: string }) => {
  const t = useTranslations("addProperty");
  if (!message) return null;

  return (
    <p className="mt-1 text-[10px] text-red-500">
      {t.has(message) ? t(message as never) : message}
    </p>
  );
};