"use client";

import DashboardLayout from "../dashboard/components/DashboardLayout";
import InsightsOverview from "./components/InsightsOverview";

export default function InsightsPage() {
  return (
    <DashboardLayout title="Insights">
      <InsightsOverview />
    </DashboardLayout>
  );
}
