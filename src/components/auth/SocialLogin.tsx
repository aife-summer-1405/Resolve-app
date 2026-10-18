
import Image from "next/image";

export default function SocialLogin() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#303030] px-2 py-3.5 text-sm text-white/75 transition hover:bg-[#383838]"
      >
        ورود با حساب اپل
        <Image
          src="/icons/apple-logo%201.png"
          alt="اپل"
          width={18}
          height={18}
        />
      </button>

      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-2xl bg-[#91FF45] px-2 py-3.5 text-sm font-medium text-[#222] transition hover:bg-[#a1ff60]"
      >
        ورود با حساب گوگل
        <Image
          src="/icons/search.png"
          alt="گوگل"
          width={18}
          height={18}
        />
      </button>
    </div>
  );
}
