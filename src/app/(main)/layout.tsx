"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/src/components/molecules/Header";
import Footer from "@/src/components/molecules/footer";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <Header isOverlay={pathname === "/"} />
      {children}
      <Footer />
    </>
  );
}
