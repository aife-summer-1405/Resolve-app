"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  BadgeCheck,
  CalendarDays,
  Clock,
  Save,
} from "lucide-react";
import type {
  IAdminUser,
  AdminUserRole,
} from "@/src/types/Admin_Dashboard/AdminUsers";
import { useUpdateUserRole } from "@/src/hooks/dashboard_Admin/useUpdateUserRole";

const ADMIN_USER_STORAGE_KEY = (id: string | number) => `admin-user:${id}`;

const ROLES: AdminUserRole[] = ["admin", "seller", "buyer"];

interface IInfoItemProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

const InfoItem = ({ icon, label, value }: IInfoItemProps) => (
  <div className="flex items-center gap-4 rounded-xl bg-background p-4">
    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#91FF45] text-black">
      {icon}
    </div>
    <div className="flex min-w-0 flex-col gap-1">
      <span className="text-xs text-muted">{label}</span>
      <span className="truncate text-sm font-medium text-foreground">
        {value}
      </span>
    </div>
  </div>
);

const AdminUserDetailsSection = () => {
  const t = useTranslations("AdminUsers");
  const locale = useLocale();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [user, setUser] = useState<IAdminUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [role, setRole] = useState<AdminUserRole>("buyer");
  const [saved, setSaved] = useState(false);

  const updateRole = useUpdateUserRole();

  useEffect(() => {
    if (!id) return;

    try {
      const raw = sessionStorage.getItem(ADMIN_USER_STORAGE_KEY(id));
      if (raw) {
        const parsed = JSON.parse(raw) as IAdminUser;
        setUser(parsed);
        setRole(parsed.role);
      }
    } catch {
      setUser(null);
    }

    setIsReady(true);
  }, [id]);

  const roleLabel = (r: string) => {
    switch (r) {
      case "admin":
        return t("adminRole");
      case "seller":
        return t("sellerRole");
      case "buyer":
        return t("buyerRole");
      default:
        return r || "-";
    }
  };

  const formatDate = (value: string | null | undefined) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBack = () => router.back();

  const handleSaveRole = () => {
    if (!user || role === user.role) return;

    setSaved(false);

    updateRole.mutate(
      { id: user.id, role },
      {
        onSuccess: () => {
          const updatedUser = { ...user, role };
          setUser(updatedUser);
          setSaved(true);

          try {
            sessionStorage.setItem(
              ADMIN_USER_STORAGE_KEY(user.id),
              JSON.stringify(updatedUser),
            );
          } catch {
            // ignore
          }
        },
      },
    );
  };

  if (!isReady) {
    return (
      <section className="rounded-xl bg-surface px-4 py-12 text-center text-sm text-muted">
        {t("loading")}
      </section>
    );
  }

  if (!user) {
    return (
      <section className="flex flex-col items-center gap-4 rounded-xl bg-surface px-4 py-12 text-center">
        <p className="text-sm text-muted">{t("userNotFound")}</p>
        <button
          type="button"
          onClick={handleBack}
          className="rounded-lg bg-[#91FF45] px-5 py-2 text-xs text-black transition hover:opacity-90"
        >
          {t("backToList")}
        </button>
      </section>
    );
  }

  const isRoleChanged = role !== user.role;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold text-foreground">
            {t("userDetails")}
          </h1>
          <p className="text-xs text-muted">{t("userDetailsDescription")}</p>
        </div>

        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 rounded-xl bg-surface px-4 py-2.5 text-xs text-foreground transition hover:text-[#91FF45]"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t("back")}
        </button>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-surface p-4 sm:p-5">
        <div className="flex flex-col items-center gap-4 border-b border-dashed border-border pb-5 sm:flex-row">
          <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-card">
            {user.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt={user.fullName}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <UserRound size={42} className="text-muted" />
            )}
          </div>

          <div className="flex min-w-0 flex-col items-center gap-2 sm:items-start">
            <h2 className="text-base font-bold text-foreground">
              {user.fullName || "-"}
            </h2>

            <span className="text-xs text-muted" dir="ltr">
              {user.email || "-"}
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex items-center rounded-full bg-card px-3 py-1 text-xs text-foreground">
                {roleLabel(user.role)}
              </span>

              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${
                  user.emailVerified
                    ? "bg-[#91FF45] text-black"
                    : "bg-[#FFCA28] text-black"
                }`}
              >
                {user.emailVerified ? t("verified") : t("notVerified")}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoItem
            icon={<UserRound size={22} />}
            label={t("fullName")}
            value={user.fullName || "-"}
          />
          <InfoItem
            icon={<Mail size={22} />}
            label={t("email")}
            value={<span dir="ltr">{user.email || "-"}</span>}
          />
          <InfoItem
            icon={<Phone size={22} />}
            label={t("phone")}
            value={<span dir="ltr">{user.phoneNumber || "-"}</span>}
          />
          <InfoItem
            icon={<ShieldCheck size={22} />}
            label={t("role")}
            value={roleLabel(user.role)}
          />
          <InfoItem
            icon={<BadgeCheck size={22} />}
            label={t("status")}
            value={user.emailVerified ? t("verified") : t("notVerified")}
          />
          <InfoItem
            icon={<CalendarDays size={22} />}
            label={t("membershipDate")}
            value={formatDate(user.membershipDate)}
          />
          <InfoItem
            icon={<Clock size={22} />}
            label={t("createdAt")}
            value={formatDate(user.createdAt)}
          />
          <InfoItem
            icon={<Clock size={22} />}
            label={t("updatedAt")}
            value={formatDate(user.updatedAt)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-1 border-b border-dashed border-border pb-4">
          <h2 className="text-sm font-bold text-foreground">
            {t("changeRole")}
          </h2>
          <p className="text-xs text-muted">{t("changeRoleDescription")}</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="user-role" className="text-xs text-muted">
              {t("role")}
            </label>

            <select
              id="user-role"
              value={role}
              disabled={updateRole.isPending}
              onChange={(e) => {
                setRole(e.target.value as AdminUserRole);
                setSaved(false);
              }}
              className="w-full cursor-pointer rounded-xl border border-border bg-background px-3 py-3 text-sm text-foreground outline-none transition focus:border-[#91FF45] disabled:opacity-50"
            >
              {ROLES.map((r) => (
                <option key={r} value={r} className="bg-surface text-foreground">
                  {roleLabel(r)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSaveRole}
            disabled={!isRoleChanged || updateRole.isPending}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#91FF45] px-6 py-3 text-sm font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />
            {updateRole.isPending ? t("saving") : t("saveRole")}
          </button>
        </div>

        {updateRole.isError && (
          <p className="text-xs text-red-500">{t("roleUpdateError")}</p>
        )}

        {saved && (
          <p className="text-xs text-[#91FF45]">{t("roleUpdateSuccess")}</p>
        )}
      </div>
    </section>
  );
};

export default AdminUserDetailsSection;