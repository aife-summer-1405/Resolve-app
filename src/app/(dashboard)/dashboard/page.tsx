import { Suspense } from "react";
import { getUserAction } from "@/src/actions/authActions";
import DashboardOverviewSection from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardOverviewSection";
import DashboardRecentReservationsSection from "@/src/components/organisms/DashboardBuyer/dashboard/DashboardRecentReservationsSection";
import SellerDashboardOverviewSection from "@/src/components/organisms/DashboardSeller/dashboard/SellerDashboardOverviewSection";
import Loading from "@/src/Loading";

const DashboardContent = async () => {
  const profile = await getUserAction();
  const role = profile?.user.role;

  return (
    <div className="mt-5 flex flex-col gap-5">
      {role === "seller" ? (
        <div>
          {" "}
          <SellerDashboardOverviewSection />
        </div>
      ) : role === "buyer" ? (
        <>
          <DashboardOverviewSection />
          <DashboardRecentReservationsSection />
        </>
      ) : (
        <p>نقش کاربر مشخص نیست.</p>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardContent />
    </Suspense>
  );
};

export default Page;
