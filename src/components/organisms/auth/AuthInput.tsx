import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface IAuthInputProps {
    id: string;
    label: string;
    type?: "text" | "email" | "password" | "tel";
    placeholder: string;
    autoComplete?: string;
    required?: boolean;
    registration: UseFormRegisterReturn;
    error?: FieldError;
}

export default function AuthInput({
    id,
    label,
    type = "text",
    placeholder,
    autoComplete,
    required = true,
    registration,
    error,
}: IAuthInputProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-xs text-white/75"
            >
                {label}
                {required && <span className="text-red-400"> *</span>}
            </label>

            <input
                id={id}
                type={type}
                autoComplete={autoComplete}
                placeholder={placeholder}
                required={required}
                aria-invalid={!!error}
                {...registration}
                className={`w-full rounded-2xl border bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-white/35 focus:border-[#91FF45] ${
                    error ? "border-red-400" : "border-white/60"
                }`}
            />

            {error?.message && (
                <p className="mt-1 text-xs text-red-400">
                    {error.message}
                </p>
            )}
        </div>
    );
}