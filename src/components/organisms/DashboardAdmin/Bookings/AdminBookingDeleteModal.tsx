"use client";

import { AlertTriangle } from "lucide-react";
import { useDeleteAdminBooking } from "@/src/hooks/dashboard_Admin/useDeleteAdminBooking";

interface AdminBookingDeleteModalProps {
  bookingId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminBookingDeleteModal = ({
  bookingId,
  onClose,
  onSuccess,
}: AdminBookingDeleteModalProps) => {
  const deleteBooking = useDeleteAdminBooking();

  const handleDeleteBooking = () => {
    deleteBooking.mutate(bookingId, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={() => {
        if (!deleteBooking.isPending) onClose();
      }}
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
          حذف رزرو
        </h3>

        <p className="mb-7 text-center text-xs leading-6 text-muted sm:mb-8">
          آیا از حذف این رزرو اطمینان دارید؟ این عملیات قابل بازگشت نیست.
        </p>

        <span className="mb-7 text-xs font-medium text-foreground">
          رزرو شماره #{bookingId}
        </span>

        {deleteBooking.isError && (
          <p className="mb-4 text-xs text-red-500">حذف رزرو با خطا مواجه شد.</p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="button"
            disabled={deleteBooking.isPending}
            onClick={handleDeleteBooking}
            className="rounded-lg bg-[#FF9500] px-5 py-2 text-[11px] text-black transition hover:bg-[#E98500] disabled:opacity-50"
          >
            {deleteBooking.isPending ? "در حال حذف..." : "تأیید حذف"}
          </button>

          <button
            type="button"
            disabled={deleteBooking.isPending}
            onClick={onClose}
            className="text-[11px] text-foreground transition hover:opacity-70 disabled:opacity-50"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDeleteModal;
