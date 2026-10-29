import type { Metadata } from "next";
import MortgageContent from "@/src/components/organisms/mortgage/MortgageContent";

export const metadata: Metadata = {
  title: "رهن و اجاره | دلتا",
  description: "مشاهده و جست‌وجوی آگهی‌های رهن و اجاره ملک",
};

export default function MortgagePage() {
  return (
    <main className="min-h-screen mt-10 bg-[#222222]">
      <MortgageContent />
    </main>
  );
}
