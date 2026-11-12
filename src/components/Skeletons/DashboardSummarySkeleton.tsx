const DashboardSummarySkeleton = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative flex aspect-[2.05/1] w-full shrink-0 animate-pulse flex-col overflow-hidden rounded-[12px] bg-surface"
        >
          <div className="absolute right-[22px] top-0 flex h-1/2 w-2/10 rounded-b-[13px] bg-muted/30" />

          <div className="absolute right-[100px] top-[28px] flex items-end gap-[10px]">
            <div className="h-3 w-6 rounded bg-muted/40" />
            <div className="h-4 w-24 rounded bg-muted/40" />
          </div>

          <div className="absolute left-[23px] right-[23px] top-[89px] border-t border-dashed border-border" />

          <div className="absolute bottom-0 flex h-4/10 w-full items-center justify-between px-[25px]">
            <div className="h-4 w-16 rounded bg-muted/40" />
            <div className="h-3 w-10 rounded bg-muted/40" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummarySkeleton;