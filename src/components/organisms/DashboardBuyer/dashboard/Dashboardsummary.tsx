import { getDashboardSummary } from "@/src/services/getDashboardSummary";
import DashboardStatCard from "./DashboardStatCard";

const DashboardSummary = async () => {
  const summary = await getDashboardSummary();

  const cards = [
    {
      title: "کل رزروها",
      summary: summary.bookings.bookingCount,
    },
    {
      title: "رزروهای فعال",
      summary: summary.bookings.conformedBookings,
    },
    {
      title: "رزروهای پرداخت‌نشده",
      summary: summary.bookings.pendingBookings,
    },
    {
      title: "میانگین امتیازات",
      summary: summary.averageRating,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <DashboardStatCard key={card.title} card={card} />
      ))}
    </div>
  );
};

export default DashboardSummary;