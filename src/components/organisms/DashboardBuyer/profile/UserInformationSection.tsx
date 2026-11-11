"use client";

import { useRef, useState, type FC, type ChangeEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import FormInput from "@/src/components/molecules/FormInput/FormInput";

const UserInformationSection: FC = () => {
  const locale = useLocale();
  const t = useTranslations("UserInformation");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }

    e.target.value = "";
  };

  const handleImageSelect = () => {
    if (selectedImage) {
      setProfileImage(selectedImage);
      setSelectedImage(null);
      setIsImageModalOpen(false);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleImageCancel = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div
        dir={locale === "fa" ? "rtl" : "ltr"}
        className="flex  w-full flex-col rounded-xl bg-surface px-[1.7%] text-foreground"
      >
        <section className="relative flex h-[154px] w-full shrink-0 items-start justify-between border-b border-border pt-4">
          <div className="flex w-4/10 flex-col gap-2">
            <h2 className="text-sm font-bold">{t("profileImage")}</h2>
            <p className="text-[11px] text-muted">
              {t("profileImageDescription")}
            </p>
          </div>

          <div className="absolute left-1/2 top-4 flex -translate-x-1/2 justify-center">
            <div className="relative aspect-square w-[104px] overflow-hidden rounded-full bg-[#D9D9D9]">
              {profileImage && (
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  unoptimized
                  className="object-cover"
                />
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              className="absolute -right-0.5 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#91FF45] text-black"
            >
              <Camera size={11} />
            </button>
            <button
              type="button"
              onClick={() => setProfileImage(null)}
              className="absolute -right-0.5 bottom-4 flex h-5 w-5 items-center justify-center rounded-full border-1 border-white bg-red-500 text-black"
            >
              <X size={11} />
            </button>
          </div>
        </section>
        <section
          dir="ltr"
          className="grid min-h-[310px] w-full border-b border-border py-10"
        >
          <div className="col-start-2 flex flex-col gap-[23px]">
            <FormInput
              name="firstName"
              label={t("firstName")}
              defaultValue="امیر محمد"
            />

            <FormInput
              name="lastName"
              label={t("lastName")}
              defaultValue="ملایی"
            />

            <FormInput
              name="email"
              label={t("email")}
              type="email"
              defaultValue="example@gamil.com"
            />

            <FormInput
              name="phone"
              label={t("phone")}
              type="tel"
              defaultValue="09123456789"
            />
          </div>

          <div
            dir={locale === "fa" ? "rtl" : "ltr"}
            className="col-start-4 flex w-full flex-col items-center gap-3"
          >
            <div className="flex w-full flex-col  gap-3">
              <h2 className="text-sm font-bold">{t("personalInformation")}</h2>

              <p className="text-right text-[11px] text-muted">
                {t("personalInformationDescription")}
              </p>
            </div>

            <div className="mt-2 flex w-full gap-9">
              <button
                type="button"
                className="rounded-xl bg-[#91FF45] px-5 py-2 text-[10px] text-black"
              >
                {t("applyChanges")}
              </button>

              <button type="button" className="text-[10px] text-muted">
                {t("cancel")}
              </button>
            </div>
          </div>
        </section>
        <section dir="ltr" className="grid min-h-[242px] w-full py-5">
          <div className="col-start-2 flex flex-col gap-[23px]">
            <FormInput
              name="currentPassword"
              label={t("currentPassword")}
              type="password"
            />

            <FormInput
              name="newPassword"
              label={t("newPassword")}
              type="password"
            />

            <FormInput
              name="repeatPassword"
              label={t("repeatPassword")}
              type="password"
            />
          </div>

          <div
            dir={locale === "fa" ? "rtl" : "ltr"}
            className="col-start-4 flex w-full flex-col items-center gap-3"
          >
            <div className="flex w-full flex-col  gap-3">
              <h2 className="text-sm font-bold">{t("security")}</h2>

              <p className="text-right text-[11px] text-muted">
                {t("securityDescription")}
              </p>
            </div>

            <div className="mt-2 flex w-full  gap-9">
              <button
                type="button"
                className="rounded-xl bg-[#91FF45] px-5 py-2 text-[10px] text-black"
              >
                {t("applyChanges")}
              </button>

              <button type="button" className="text-[10px] text-muted">
                {t("cancel")}
              </button>
            </div>
          </div>
        </section>
      </div>

      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={handleImageCancel}
        >
          <div
            dir={locale === "fa" ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
            className="relative flex aspect-[500/510] w-full max-w-[500px] min-w-[320px] flex-col overflow-hidden rounded-xl bg-surface"
          >
            <div className="flex h-[13%] shrink-0 items-center justify-between border-b border-dashed border-border px-[4%]">
              <h3 className="text-sm font-medium">{t("selectProfile")}</h3>

              <button
                type="button"
                onClick={handleImageCancel}
                className="flex items-center gap-2 text-xs text-muted"
              >
                {t("close")}
                <X size={14} />
              </button>
            </div>

            <div className="relative flex-1">
              <div className="absolute left-1/2 top-[4%] aspect-square w-[45%] -translate-x-1/2 overflow-hidden rounded-full bg-[#D9D9D9]">
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt="Selected profile"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
              </div>

              <div
                dir="ltr"
                className="absolute left-1/2 top-[75%] flex -translate-x-1/2 items-center justify-center gap-4"
              >
                <button
                  type="button"
                  onClick={handleImageSelect}
                  className="rounded-xl bg-[#91FF45] px-5 py-2 text-[10px] text-black"
                >
                  {t("select")}
                </button>

                <button
                  type="button"
                  onClick={handleImageCancel}
                  className="text-[10px] text-muted"
                >
                  {t("cancel")}
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInformationSection;
