"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface IErrorProps {
error: Error & { digest?: string };
reset: () => void;
}

const Error = ({ error, reset }: IErrorProps) => {
useEffect(() => {
console.error(error);
}, [error]);

return (
    <div
        dir="rtl"
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center text-white"
    >
        <AlertCircle size={48} className="text-red-400" />

        <h2 className="text-xl font-bold">
            مشکلی پیش آمده است!
        </h2>

        <p className="text-muted">
            در بارگذاری اطلاعات خطایی رخ داد. لطفاً دوباره تلاش کنید.
        </p>

      <button
    onClick={() => window.location.reload()}
    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-black transition-colors hover:bg-primary-hover"
>
    <RefreshCw size={18} />
    تلاش مجدد
</button>
    </div>
);

};

export default Error;