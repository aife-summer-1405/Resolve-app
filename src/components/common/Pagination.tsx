"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background disabled:opacity-40"
      >
        <ChevronRight size={15} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs transition-colors ${
              currentPage === page
                ? "bg-primary text-black"
                : "text-foreground hover:bg-background"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background disabled:opacity-40"
      >
        <ChevronLeft size={15} />
      </button>
    </div>
  );
};

export default Pagination;