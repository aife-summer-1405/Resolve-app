import { getTranslations } from "next-intl/server";
import DashboardSummary from "./Dashboardsummary";
import DashboardSummarySkeleton from "@/src/components/Skeletons/DashboardSummarySkeleton";
import { Suspense } from "react";
import DashboardOverviewSectionClient from "./DashboardOverviewSectionClient";

interface IDashboardOverviewSectionProps {
  additionalPercentage?: number;
}

const DashboardOverviewSection = async ({
  additionalPercentage = 0,
}: IDashboardOverviewSectionProps) => {
  const t = await getTranslations("DashboardOverviewSection");

  return (
    <section className="flex w-full flex-col gap-4">
      <Suspense fallback={<DashboardSummarySkeleton />}>
        <DashboardSummary />
      </Suspense>

      <DashboardOverviewSectionClient
        additionalPercentage={additionalPercentage}
        reservationsChartTitle={t("reservationsChart")}
        profileStatusTitle={t("profileStatus")}
        editTitle={t("edit")}
      />
    </section>
  );
};

export default DashboardOverviewSection;