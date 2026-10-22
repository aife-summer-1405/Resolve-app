import type { ReactNode } from "react";

interface FolderBoxProps {
    children: ReactNode;
    className?: string;
    contentClassName?: string;
}

const FolderBox = ({
    children,
    className = "",
    contentClassName = "",
}: FolderBoxProps) => {
    return (
        <div
            dir="ltr"
            className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-[#393939] pt-5 scale-x-[-1] ${className}`}
        >
            <div className="absolute -right-2 top-0 z-10 h-5 w-9/10 bg-background [clip-path:polygon(0_0,100%_0,100%_100%,10%_100%)]" />

            <div className={` w-4/5 scale-x-[-1] ${contentClassName}`}>
                {children}
            </div>
        </div>
    );
};

export default FolderBox;