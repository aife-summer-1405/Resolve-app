import type { FC, ReactNode } from "react";
import DashboardHeader from "@/src/components/organisms/dashboard/DashboardHeader";
import DashboardSidebar from "@/src/components/organisms/dashboard/DashboardSidebar";

interface IDashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<IDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-background" dir="rtl">
      <DashboardSidebar />

      <main className="min-w-0 flex-1 p-6">
        <DashboardHeader />

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
