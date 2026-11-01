export default function Loading() {
    return (
        <div className="mt-10 animate-pulse space-y-6">
            {/* گالری عکس */}
            <div className="h-64 w-full rounded-2xl bg-white/10 sm:h-80 lg:h-[28rem]" />

            <div className="flex flex-col gap-6 lg:flex-row">
                {/* ستون اصلی */}
                <div className="flex-1 space-y-4">
                    <div className="h-8 w-2/3 rounded-lg bg-white/10" />
                    <div className="h-4 w-1/3 rounded bg-white/10" />
                    <div className="space-y-2 pt-4">
                        <div className="h-4 w-full rounded bg-white/10" />
                        <div className="h-4 w-full rounded bg-white/10" />
                        <div className="h-4 w-4/5 rounded bg-white/10" />
                    </div>
                </div>

                {/* کارت رزرو / قیمت */}
                <div className="h-64 w-full rounded-2xl bg-white/10 lg:w-1/3" />
            </div>
        </div>
    );
}