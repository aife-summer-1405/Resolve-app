import DashboardOverviewSection from "@/src/components/organisms/dashboard/DashboardOverviewSection";
import DashboardRecentReservationsSection from "@/src/components/organisms/dashboard/DashboardRecentReservationsSection";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5 mt-5">
      <DashboardOverviewSection />
      <DashboardRecentReservationsSection />
    </div>
  );
};

export default page;
