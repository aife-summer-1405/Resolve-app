
"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import useProfile from "@/src/hooks/dashboard/useProfile";

interface IProfilePictureSectionProps {
  profilePicture?: string | null;
}

const ProfilePictureSection = ({
  profilePicture,
}: IProfilePictureSectionProps) => {
  const locale = useLocale();
  const t = useTranslations("UserInformation");

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(0);

  const fileUpload = useProfile();

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const preview = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewImage(preview);
    fileUpload.reset();
  };

  const handleImageUpload = () => {
    if (!selectedFile) return;

    fileUpload.mutate(selectedFile, {
      onSuccess: () => {
        setSelectedFile(null);
        setPreviewImage(null);
        setIsImageModalOpen(false);
        setInputKey((prev) => prev + 1);
      },
    });
  };

  const handleImageCancel = () => {
    setIsImageModalOpen(false);
    setSelectedFile(null);
    setPreviewImage(null);
    fileUpload.reset();
    setInputKey((prev) => prev + 1);
  };

  return (
    <>
      <section className="relative flex h-[154px] w-full shrink-0 items-start justify-between border-b border-border pt-4">
        <div className="flex w-4/10 flex-col gap-2">
          <h2 className="text-sm font-bold">{t("profileImage")}</h2>

          <p className="text-[11px] text-muted">
            {t("profileImageDescription")}
          </p>
        </div>

        <div className="absolute left-1/2 top-4 flex -translate-x-1/2 justify-center">
          <div className="relative aspect-square w-[104px] overflow-hidden rounded-full bg-[#D9D9D9]">
            {profilePicture && (
              <Image
                src={profilePicture}
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
            className="absolute -right-0.5 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-primary text-black"
          >
            <Camera size={11} />
          </button>
           <button
            type="button"
            
            className="absolute -right-0.5 bottom-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-600 text-black"
          >
            <X size={11} />
          </button>
        </div>
      </section>

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
              <h3 className="text-sm font-medium">
                {t("selectProfile")}
              </h3>

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
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Selected profile"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
              </div>

              <input
                key={inputKey}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute left-1/2 top-[65%] w-[80%] -translate-x-1/2 text-xs text-muted"
              />

              <div
                dir="ltr"
                className="absolute left-1/2 top-[82%] flex -translate-x-1/2 items-center justify-center gap-4"
              >
                <button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={!selectedFile || fileUpload.isPending}
                  className="rounded-xl bg-primary px-5 py-2 text-[10px] text-black disabled:opacity-50"
                >
                  {fileUpload.isPending
                    ? "در حال آپلود..."
                    : t("select")}
                </button>

                <button
                  type="button"
                  onClick={handleImageCancel}
                  className="text-[10px] text-muted"
                >
                  {t("cancel")}
                </button>
              </div>

              {fileUpload.isError && (
                <p className="absolute bottom-[3%] w-full text-center text-[11px] text-red-500">
                  آپلود تصویر با خطا مواجه شد.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePictureSection;
