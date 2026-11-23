"use client";

import { AlertTriangle } from "lucide-react";

import type { IDiscountCode } from "@/src/types/Admin_Dashboard/DiscountCodes";

interface DeleteDiscountCodeModalProps {
  isOpen: boolean;
  selectedCode: IDiscountCode | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  isPending: boolean;
}

const DeleteDiscountCodeModal = ({
  isOpen,
  selectedCode,
  onClose,
  onConfirm,
  isPending,
}: DeleteDiscountCodeModalProps) => {
  if (!isOpen || !selectedCode) return null;

  const handleDelete = async () => {
    await onConfirm(selectedCode.id);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={isPending ? undefined : onClose}
    >
      <div
        className="flex w-full max-w-[390px] flex-col items-center rounded-[22px] bg-surface px-5 py-6 text-foreground shadow-2xl sm:px-6 sm:py-7"
        onClick={(e) => e.stopPropagation()}
      >
        <AlertTriangle
          size={62}
          strokeWidth={1.8}
          className="mb-7 fill-[#FFB800] text-black sm:mb-9"
        />

        <h3 className="mb-4 text-center text-sm font-bold sm:text-base">
          حذف کد تخفیف
        </h3>

        <p className="mb-7 text-center text-xs leading-6 text-muted sm:mb-8">
          آیا از حذف این کد تخفیف اطمینان دارید؟ این عملیات قابل بازگشت نیست.
        </p>

        <span className="mb-7 text-xs font-medium text-foreground">
          کد تخفیف {selectedCode.code}
        </span>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-lg bg-[#FF9500] px-5 py-2 text-[11px] text-black transition hover:bg-[#E98500] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "در حال حذف..." : "تأیید حذف"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="text-[11px] text-foreground transition hover:opacity-70 disabled:opacity-50"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDiscountCodeModal;
