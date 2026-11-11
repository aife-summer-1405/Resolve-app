
"use client";

import { useState, type FC, type ChangeEvent, type FormEvent, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import FormInput from "@/src/components/molecules/FormInput/FormInput";
import { useUser } from "@/src/hooks/useUser";
import { useUpdateUser } from "@/src/hooks/dashboard/useUpdateUser";
import useChangePassword from "@/src/hooks/dashboard/useChangePassword";
import ProfilePictureSection from "./ProfilePictureSection";

interface IUserForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface IPasswordForm {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const initialPasswordForm: IPasswordForm = {
  currentPassword: "",
  newPassword: "",
  repeatPassword: "",
};

const initialForm: IUserForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const UserInformationSection: FC = () => {
  const locale = useLocale();
  const t = useTranslations("UserInformation");

  const [form, setForm] = useState<IUserForm>(initialForm);
  const [passwordForm, setPasswordForm] =
    useState<IPasswordForm>(initialPasswordForm);

  const [passwordError, setPasswordError] = useState("");

  const { data: userData } = useUser();
  const updateUser = useUpdateUser();
  const changePassword = useChangePassword();

  const user = userData?.user;

  useEffect(() => {
    if (!user) return;

    setForm({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
    });
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPasswordError("");
    changePassword.reset();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.id) return;

    updateUser.mutate({
      id: user.id,
      payload: {
        ...form,
        fullName: `${form.firstName} ${form.lastName}`.trim(),
      },
    });
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { currentPassword, newPassword, repeatPassword } = passwordForm;

    if (!currentPassword || !newPassword || !repeatPassword) {
      setPasswordError("لطفاً تمام فیلدها را تکمیل کنید.");
      return;
    }

    if (newPassword !== repeatPassword) {
      setPasswordError("رمز عبور جدید و تکرار آن یکسان نیستند.");
      return;
    }

    changePassword.mutate(
      {
        currentPassword,
        newPassword,
      },
      {
        onSuccess: () => {
          setPasswordForm(initialPasswordForm);
          setPasswordError("");
        },
      }
    );
  };

  const handleCancel = () => {
    if (!user) return;

    setForm({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
    });
  };

return (
  <div
    dir={locale === "fa" ? "rtl" : "ltr"}
    className="flex w-full flex-col rounded-xl bg-surface px-[1.7%] text-foreground"
  >
    <ProfilePictureSection
      profilePicture={user?.profilePicture}
    />

    <form onSubmit={handleSubmit}>
      <section
        dir="ltr"
        className="grid min-h-[310px] w-full border-b border-border py-10"
      >
        <div className="col-start-2 flex flex-col gap-[23px]">
          <FormInput
            name="firstName"
            label={t("firstName")}
            value={form.firstName}
            onChange={handleChange}
          />

          <FormInput
            name="lastName"
            label={t("lastName")}
            value={form.lastName}
            onChange={handleChange}
          />

          <FormInput
            name="email"
            label={t("email")}
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <FormInput
            name="phoneNumber"
            label={t("phone")}
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div
          dir={locale === "fa" ? "rtl" : "ltr"}
          className="col-start-4 flex w-full flex-col items-center gap-3"
        >
          <div className="flex w-full flex-col gap-3">
            <h2 className="text-sm font-bold">
              {t("personalInformation")}
            </h2>

            <p className="text-right text-[11px] text-muted">
              {t("personalInformationDescription")}
            </p>
          </div>

          <div className="mt-2 flex w-full gap-9">
            <button
              type="submit"
              disabled={updateUser.isPending}
              className="rounded-xl bg-primary px-5 py-2 text-[10px] text-black disabled:opacity-50"
            >
              {updateUser.isPending
                ? "در حال ذخیره..."
                : t("applyChanges")}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="text-[10px] text-muted"
            >
              {t("cancel")}
            </button>
          </div>

          {updateUser.isError && (
            <p className="text-[11px] text-red-500">
              ذخیره اطلاعات با خطا مواجه شد.
            </p>
          )}

          {updateUser.isSuccess && (
            <p className="text-[11px] text-green-500">
              اطلاعات با موفقیت ذخیره شد.
            </p>
          )}
        </div>
      </section>
    </form>

    <form onSubmit={handlePasswordSubmit}>
      <section dir="ltr" className="grid min-h-[242px] w-full py-5">
        <div className="col-start-2 flex flex-col gap-[23px]">
          <FormInput
            name="currentPassword"
            label={t("currentPassword")}
            type="password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
          />

          <FormInput
            name="newPassword"
            label={t("newPassword")}
            type="password"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
          />

          <FormInput
            name="repeatPassword"
            label={t("repeatPassword")}
            type="password"
            value={passwordForm.repeatPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <div
          dir={locale === "fa" ? "rtl" : "ltr"}
          className="col-start-4 flex w-full flex-col items-center gap-3"
        >
          <div className="flex w-full flex-col gap-3">
            <h2 className="text-sm font-bold">{t("security")}</h2>

            <p className="text-right text-[11px] text-muted">
              {t("securityDescription")}
            </p>
          </div>

          <div className="mt-2 flex w-full gap-9">
            <button
              type="submit"
              disabled={changePassword.isPending}
              className="rounded-xl bg-primary px-5 py-2 text-[10px] text-black disabled:opacity-50"
            >
              {changePassword.isPending
                ? "در حال تغییر رمز..."
                : t("applyChanges")}
            </button>

            <button
              type="button"
              onClick={() => {
                setPasswordForm(initialPasswordForm);
                setPasswordError("");
                changePassword.reset();
              }}
              className="text-[10px] text-muted"
            >
              {t("cancel")}
            </button>
          </div>

          {passwordError && (
            <p className="text-[11px] text-red-500">
              {passwordError}
            </p>
          )}

          {changePassword.isError && (
            <p className="text-[11px] text-red-500">
              تغییر رمز عبور با خطا مواجه شد. رمز فعلی را بررسی کنید.
            </p>
          )}

          {changePassword.isSuccess && (
            <p className="text-[11px] text-green-500">
              رمز عبور با موفقیت تغییر کرد.
            </p>
          )}
        </div>
      </section>
    </form>
  </div>
);
};

export default UserInformationSection;
