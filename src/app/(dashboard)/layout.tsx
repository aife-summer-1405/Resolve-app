import type { FC, ReactNode } from "react";
import DashboardHeader from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardHeader";
import DashboardSidebar from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardSidebar";

interface IDashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<IDashboardLayoutProps> = ({ children }) => {
  return (
    <div
      className="flex min-h-screen w-full flex-col bg-background lg:flex-row"
      dir="rtl"
    >
      <DashboardSidebar />

      <main className="w-full min-w-0 flex-1 p-3 sm:p-4 lg:p-6">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;