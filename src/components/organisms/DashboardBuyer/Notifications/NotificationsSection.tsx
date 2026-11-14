"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AlertTriangle, CheckCircle2, ChevronDown } from "lucide-react";
import Pagination from "@/src/components/common/Pagination";

interface INotification {
  id: number;
  message: string;
  date: string;
}

const NotificationsSection = () => {
  const t = useTranslations("NotificationsSection");
  const locale = useLocale();

  const [readIds, setReadIds] = useState<number[]>([3, 4, 5, 6]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isUnreadOpen, setIsUnreadOpen] = useState(true);
  const [isReadOpen, setIsReadOpen] = useState(true);

  const notifications = useMemo<INotification[]>(
    () => [
      {
        id: 1,
        message: t("messages.welcome"),
        date:
          locale === "fa" ? "۱۲ مرداد ۱۴۰۱ - ۱۲:۵۳" : "August 3, 2022 - 12:53",
      },
      {
        id: 2,
        message: t("messages.reservation"),
        date:
          locale === "fa" ? "۱۲ مرداد ۱۴۰۱ - ۱۲:۵۳" : "August 3, 2022 - 12:53",
      },
      {
        id: 3,
        message: t("messages.welcome"),
        date:
          locale === "fa" ? "۱۲ مرداد ۱۴۰۱ - ۱۲:۵۳" : "August 3, 2022 - 12:53",
      },
      {
        id: 4,
        message: t("messages.reservation"),
        date:
          locale === "fa" ? "۱۲ مرداد ۱۴۰۱ - ۱۲:۵۳" : "August 3, 2022 - 12:53",
      },
      {
        id: 5,
        message: t("messages.welcome"),
        date:
          locale === "fa" ? "۱۲ مرداد ۱۴۰۱ - ۱۲:۵۳" : "August 3, 2022 - 12:53",
      },
      {
        id: 6,
        message: t("messages.reservation"),
        date:
          locale === "fa" ? "۱۲ مرداد ۱۴۰۱ - ۱۲:۵۳" : "August 3, 2022 - 12:53",
      },
    ],
    [locale, t],
  );

  const unreadNotifications = notifications.filter(
    (notification) => !readIds.includes(notification.id),
  );

  const readNotifications = notifications.filter((notification) =>
    readIds.includes(notification.id),
  );

  const handleReadNotification = (id: number) => {
    setReadIds((prev) => [...prev, id]);
  };

  const handleReadAll = () => {
    setReadIds(notifications.map((notification) => notification.id));
    setIsConfirmOpen(false);
  };

  return (
    <section dir="rtl" className="w-full rounded-xl bg-surface p-3 sm:p-5">
      <div className="flex flex-col gap-4 border-b border-dashed border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-foreground">
          {t("listTitle")}
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <label className="absolute -top-[7px] right-3 z-10 bg-surface px-1 text-[10px] text-muted">
              {t("status")}
            </label>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-[38px] w-[105px] appearance-none rounded-xl border border-border bg-surface pr-3 pl-6 text-xs text-foreground outline-none focus:border-primary"
            >
              <option value="all">{t("all")}</option>
              <option value="unread">{t("unread")}</option>
              <option value="read">{t("read")}</option>
            </select>

            <ChevronDown
              size={13}
              className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            className="h-[38px] whitespace-nowrap rounded-lg bg-[#91FF45] px-3 text-xs font-medium text-black transition-opacity hover:opacity-90"
          >
            {t("markAllAsRead")}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <div className="grid grid-cols-10 items-center rounded-lg bg-background px-3 py-2 text-xs font-medium text-foreground">
          <span className="col-span-6">{t("notification")}</span>
          <span className="col-span-4 text-center">{t("date")}</span>
        </div>

        {(filter === "all" || filter === "unread") && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setIsUnreadOpen(!isUnreadOpen)}
              className="flex w-full items-center gap-1 text-[10px] text-muted"
            >
              <ChevronDown
                size={12}
                className={`transition-transform ${
                  isUnreadOpen ? "" : "-rotate-90"
                }`}
              />
              {t("unread")}
            </button>

            {isUnreadOpen && (
              <div className="mt-2 flex flex-col gap-1.5">
                {unreadNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="grid grid-cols-10 items-center gap-2 rounded-lg bg-background px-2 py-2 text-xs text-foreground sm:px-3"
                  >
                    <div className="col-span-6 flex min-w-0 items-center gap-2">
                      <span className="truncate">{notification.message}</span>

                      <button
                        type="button"
                        onClick={() => handleReadNotification(notification.id)}
                        className="flex shrink-0 items-center gap-1 rounded-full bg-[#91FF45] px-2 py-1 text-[9px] text-black transition-opacity hover:opacity-80"
                      >
                        <CheckCircle2 size={10} />
                        <span>{t("markAsRead")}</span>
                      </button>
                    </div>

                    <span className="col-span-4 whitespace-nowrap text-center text-[10px]">
                      {notification.date}
                    </span>
                  </div>
                ))}

                {unreadNotifications.length === 0 && (
                  <p className="py-4 text-center text-xs text-muted">
                    {t("emptyUnread")}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {(filter === "all" || filter === "read") && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setIsReadOpen(!isReadOpen)}
              className="flex w-full items-center gap-1 text-[10px] text-muted"
            >
              <ChevronDown
                size={12}
                className={`transition-transform ${
                  isReadOpen ? "" : "-rotate-90"
                }`}
              />
              {t("read")}
            </button>

            {isReadOpen && (
              <div className="mt-2 flex flex-col gap-1.5">
                {readNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="grid grid-cols-10 items-center gap-2 rounded-lg px-2 py-2 text-xs text-foreground sm:px-3"
                  >
                    <span className="col-span-6 truncate">
                      {notification.message}
                    </span>

                    <span className="col-span-4 whitespace-nowrap text-center text-[10px]">
                      {notification.date}
                    </span>
                  </div>
                ))}

                {readNotifications.length === 0 && (
                  <p className="py-4 text-center text-xs text-muted">
                    {t("emptyRead")}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-muted">
          {t("page")} {currentPage}
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>

      {isConfirmOpen && (
        <div
          dir="rtl"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsConfirmOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-[460px] flex-col items-center rounded-[24px] bg-surface px-5 py-6 text-foreground sm:px-8 sm:py-7"
          >
            <AlertTriangle
              size={68}
              strokeWidth={1.8}
              className="mb-6 fill-[#FFB800] text-black"
            />

            <h3 className="max-w-[380px] text-center text-sm font-bold leading-7 sm:text-base">
              {t("confirmTitle")}
            </h3>

            <div className="mt-6 flex items-center gap-5">
              <button
                type="button"
                onClick={handleReadAll}
                className="h-[40px] rounded-xl bg-[#FF9500] px-6 text-sm text-black transition hover:bg-[#E98500]"
              >
                {t("confirm")}
              </button>

              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="text-sm text-foreground transition hover:opacity-60"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NotificationsSection;
