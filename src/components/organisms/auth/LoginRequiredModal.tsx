"use client";

import { User } from "lucide-react";
import Link from "next/link";

interface ILoginRequiredModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginRequiredModal = ({
    isOpen,
    onClose,
}: ILoginRequiredModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-xl"
            >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <User size={28} className="text-primary" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-foreground">
                    ابتدا وارد حساب کاربری شوید
                </h3>

                <p className="mb-6 text-sm leading-6 text-muted">
                    برای ثبت رزرو اقامتگاه، ابتدا باید وارد حساب کاربری خود شوید.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/login"
                        className="flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-bold text-neutral-900 transition hover:bg-primary-hover"
                    >
                        ورود به حساب کاربری
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-xl border border-border py-3 text-sm font-medium text-foreground transition hover:bg-surface"
                    >
                        انصراف
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginRequiredModal;