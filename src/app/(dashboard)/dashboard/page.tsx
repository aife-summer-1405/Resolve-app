import DashboardOverviewSection from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardOverviewSection";
import DashboardRecentReservationsSection from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardRecentReservationsSection";

const Page = () => {
  return (
    <div className="mt-5 flex flex-col gap-5">
      <DashboardOverviewSection />
      <DashboardRecentReservationsSection />
    </div>
  );
};

export default Page;
