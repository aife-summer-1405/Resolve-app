import { getTranslations } from "next-intl/server";
import DashboardRecentReservationsSection from "../../DashboardBuyer/dashboard/DashboardRecentReservationsSection";
import DashboardStatCard from "../../DashboardBuyer/dashboard/DashboardStatCard";
import SellerDashboardIncomeSection from "./SellerDashboardIncomeSection";
import { getSelletDashboardfinance } from "@/src/services/getSelletDashboardfinance";

const SellerDashboardOverviewSection = async () => {
  const t = await getTranslations("SellerDashboardOverviewSection");


  const cards = [
    {
      title: t("totalProperties"),
      summary: "۱۲",
    },
    {
      title: t("activeReservations"),
      summary: "۸",
    },
    {
      title: t("pendingReservations"),
      summary: "۴",
    },
    {
      title: t("todayViews"),
      summary: "۲۵",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <DashboardStatCard key={index} card={card} />
        ))}
      </div>

      <SellerDashboardIncomeSection />
      <DashboardRecentReservationsSection />
    </section>
  );
};

export default SellerDashboardOverviewSection;