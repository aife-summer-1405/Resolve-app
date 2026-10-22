export const MainPartLoading = () => {
    return (
        <div className="flex h-full min-h-0 flex-col gap-4 lg:flex-row-reverse lg:gap-6">
            <div className="min-h-0 flex-1 space-y-4 overflow-hidden lg:w-3/5">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-40 animate-pulse rounded-2xl bg-[#3D3D3D]"
                    />
                ))}
            </div>

            <div className="h-64 w-full shrink-0 animate-pulse rounded-2xl bg-[#3D3D3D] lg:h-auto lg:min-h-0 lg:w-2/5" />
        </div>
    );
};