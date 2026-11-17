
"use client";

import { useRouter } from "next/navigation";
import { useAddFavorite, useDeleteFavorite } from "@/src/hooks/dashboard/useFavorites";
import { useUserData } from "@/src/providers/UserDataContextProvider";
import { Copy, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

interface IHeaderButtonsProps {
  isFavo: boolean;
  houseId: string;
  favoriteId?: number | null;
}

const HeaderButtons = ({
  isFavo,
  houseId,
  favoriteId,
}: IHeaderButtonsProps) => {
  const router = useRouter();
  const { userData } = useUserData();
 
  const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();
  const { mutate: deleteFavorite, isPending: isDeleting } = useDeleteFavorite();

  const isPending = isAdding || isDeleting;

  const handleFavorite = () => {
    if (!userData?.user.id || isPending) return;

    if (isFavo) {
      if (!favoriteId) return;

      deleteFavorite(Number(favoriteId), {
        onSuccess: () => {
          toast.success("از علاقه‌مندی‌ها حذف شد");
          router.refresh();
        },
        onError: () => {
          toast.error("حذف از علاقه‌مندی‌ها ناموفق بود");
        },
      });
    } else {
      addFavorite(
        {
          house_id: houseId,
          user_id: userData.user.id,
        },
        {
          onSuccess: () => {
            toast.success("به علاقه‌مندی‌ها اضافه شد");
            router.refresh();
          },
          onError: () => {
            toast.error("افزودن به علاقه‌مندی‌ها ناموفق بود");
          },
        }
      );
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("لینک با موفقیت کپی شد");
    } catch {
      toast.error("کپی لینک ناموفق بود");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("لینک برای اشتراک‌گذاری کپی شد");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;

      toast.error("اشتراک‌گذاری ناموفق بود");
    }
  };

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleCopy}
        title="کپی لینک"
        aria-label="کپی لینک"
        className="rounded-md bg-primary p-1"
      >
        <Copy />
      </button>

      <button
        type="button"
        onClick={handleShare}
        title="اشتراک‌گذاری"
        aria-label="اشتراک‌گذاری"
        className="rounded-md bg-card p-1"
      >
        <Share2 />
      </button>

      <button
        type="button"
        onClick={handleFavorite}
        disabled={isPending}
        title={isFavo ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        aria-label={isFavo ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        className="rounded-md bg-card p-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Heart
          className={isFavo ? "fill-current text-red-500" : "text-foreground"}
        />
      </button>
    </div>
  );
};

export default HeaderButtons;
