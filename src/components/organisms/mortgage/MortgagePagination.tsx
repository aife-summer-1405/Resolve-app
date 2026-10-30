"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface MortgagePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function MortgagePagination({
  currentPage,
  totalPages,
  onPageChange,
}: MortgagePaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      dir="rtl"
      aria-label="صفحه‌بندی آگهی‌ها"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="صفحه قبل"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition ${
            currentPage === page
              ? "bg-[#91FF45] text-black"
              : "border border-white/10 text-white hover:bg-white/10"
          }`}
        >
          {page.toLocaleString("fa-IR")}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="صفحه بعد"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={18} />
      </button>
    </nav>
  );
}
