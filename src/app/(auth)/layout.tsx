
// import Footer from "@/src/components/molecules/Footer/footer";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#11120F] text-white"
    >
      {children}
    </main>
  );
}
