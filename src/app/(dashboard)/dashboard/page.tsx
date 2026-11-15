import { Suspense } from "react";
import { getUserAction } from "@/src/actions/authActions";
import DashboardOverviewSection from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardOverviewSection";
import DashboardRecentReservationsSection from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardRecentReservationsSection";
import SellerDashboardOverviewSection from "@/src/components/organisms/DashboardSeller/dashboard/SellerDashboardOverviewSection";
import Loading from "@/src/Loading";

interface IPageProps {
  searchParams: Promise<{ view?: string }>;
}

const DashboardContent = async ({ searchParams }: IPageProps) => {
  const { view } = await searchParams;

  const profile = await getUserAction();
  const role = profile?.user.role;

  const isBuyerView =
    view === "buyer" && (role === "seller" || role === "admin");

  const isSellerView =
    view === "seller" && (role === "seller" || role === "admin");

  return (
    <div className="mt-5 flex flex-col gap-5">
      {role === "seller" ? (
        isBuyerView ? (
          <>
            <DashboardOverviewSection />
            <DashboardRecentReservationsSection />
          </>
        ) : (
          <SellerDashboardOverviewSection />
        )
      ) : role === "buyer" ? (
        <>
          <DashboardOverviewSection />
          <DashboardRecentReservationsSection />
        </>
      ) : role === "admin" ? (
        isSellerView ? (
          <SellerDashboardOverviewSection />
        ) : (
          <>
            <DashboardOverviewSection />
            <DashboardRecentReservationsSection />
          </>
        )
      ) : (
        <p>نقش کاربر مشخص نیست.</p>
      )}
    </div>
  );
};

const Page = ({ searchParams }: IPageProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardContent searchParams={searchParams} />
    </Suspense>
  );
};

export default Page;
