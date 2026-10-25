
type AuthInputProps = {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "tel";
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
};

export default function AuthInput({
  id,
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
}: AuthInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs text-white/75"
      >
        {label} <span className="text-red-400">*</span>
      </label>

      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-white/60 bg-transparent px-4 py-4 text-sm outline-none transition placeholder:text-white/35 focus:border-[#91FF45]"
      />
    </div>
  );
}
