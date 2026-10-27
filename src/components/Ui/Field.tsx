import type { ReactNode } from "react";

interface FieldProps {
    legend: string;
    children: ReactNode;
}

function Field({ legend, children }: FieldProps) {
    return (
        <fieldset className="rounded-xl border border-textgray px-3 pb-1.5 pt-0 transition-colors focus-within:border-primary-hover">
            <legend className="px-1.5 text-[0.65rem] text-textgray">
                {legend}
            </legend>
            {children}
        </fieldset>
    );
}

export default Field;