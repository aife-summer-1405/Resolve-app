import DashboardSidebar from "@/src/components/organisms/dashboard/DashboardSidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen w-full bg-background" dir="rtl">
      <DashboardSidebar />

      <main className="min-w-0 flex-1 p-6">
        <h1 className="text-2xl font-bold text-foreground">داشبورد</h1>
      </main>
    </div>
  );
};

export default page;
