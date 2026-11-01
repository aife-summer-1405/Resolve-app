"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MortgagePaginationProps {
  currentPage: number;
  totalPages: number;
}

const MAX_VISIBLE = 5;

const getVisiblePages = (current: number, total: number): number[] => {
  if (total <= MAX_VISIBLE) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const half = Math.floor(MAX_VISIBLE / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(total, start + MAX_VISIBLE - 1);
  start = Math.max(1, end - MAX_VISIBLE + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const baseClass =
  "flex h-10 items-center justify-center rounded-xl border border-white/10 text-white transition hover:bg-white/10";

const disabledClass = "pointer-events-none opacity-30";

export default function MortgagePagination({
  currentPage,
  totalPages,
}: MortgagePaginationProps) {


  console.log("totalPages",totalPages)
 const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");

    if (page <= 1) params.delete("page");
    else params.set("page", String(page));

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const pages = getVisiblePages(currentPage, totalPages);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav
      dir="rtl"
      aria-label="صفحه‌بندی آگهی‌ها"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <Link
        href={hrefFor(currentPage - 1)}
        scroll={false}
        aria-label="صفحه قبل"
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : undefined}
        className={`${baseClass} w-10 ${isFirst ? disabledClass : ""}`}
      >
        <ChevronRight size={18} />
      </Link>

      {pages[0] > 1 && (
        <>
          <Link
            href={hrefFor(1)}
            scroll={false}
            className={`${baseClass} min-w-10 px-3 text-sm font-medium`}
          >
            {(1).toLocaleString("fa-IR")}
          </Link>
          {pages[0] > 2 && <span className="px-1 text-white/50">…</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={hrefFor(page)}
          scroll={false}
          aria-current={currentPage === page ? "page" : undefined}
          className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition ${
            currentPage === page
              ? "bg-[#91FF45] text-black"
              : "border border-white/10 text-white hover:bg-white/10"
          }`}
        >
          {page.toLocaleString("fa-IR")}
        </Link>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-1 text-white/50">…</span>
          )}
          <Link
            href={hrefFor(totalPages)}
            scroll={false}
            className={`${baseClass} min-w-10 px-3 text-sm font-medium`}
          >
            {totalPages.toLocaleString("fa-IR")}
          </Link>
        </>
      )}

      <Link
        href={hrefFor(currentPage + 1)}
        scroll={false}
        aria-label="صفحه بعد"
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : undefined}
        className={`${baseClass} w-10 ${isLast ? disabledClass : ""}`}
      >
        <ChevronLeft size={18} />
      </Link>
    </nav>
  );
}