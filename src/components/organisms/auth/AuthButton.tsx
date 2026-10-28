
import { AuthButtonProps } from "@/src/types/AuthType/Authtype";

export default function AuthButton({
  children,
  type = "submit",
  disabled = false,
  onClick,
}: AuthButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-2xl bg-[#91FF45] px-4 py-4 text-sm font-semibold text-[#222] shadow-[0_5px_22px_#91ff4525] transition hover:bg-[#a1ff60] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}
