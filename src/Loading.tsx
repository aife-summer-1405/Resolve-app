export default function Loading() {
return (
<div
         dir="rtl"
         className="flex min-h-screen items-center justify-center bg-surface"
     >
<div className="flex flex-col items-center gap-6">
<div className="relative flex h-20 w-20 items-center justify-center">
<div className="absolute inset-0 animate-spin rounded-full border-4 border-white/10 border-t-primary" />
<div className="h-8 w-8 animate-pulse rounded-xl bg-primary" />
</div>

            <div className="flex flex-col items-center gap-2">
                <p className="text-lg font-semibold text-white">
                    در حال بارگذاری
                </p>
                <p className="text-sm text-muted">
                    لطفاً کمی صبر کنید...
                </p>
            </div>
        </div>
    </div>
);

}