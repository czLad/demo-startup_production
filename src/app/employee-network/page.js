"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/components/DashboardLayout";
import BreathingComingSoon from "../dashboard/components/BreathingComingSoon";

export default function EmployeeNetworkPage() {
  const [contentHeight, setContentHeight] = useState("");

  useEffect(() => {
    // Adjust height dynamically to fit available viewport space
    const updateHeight = () => {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;
      const availableHeight = window.innerHeight - headerHeight - 48; // 48px = desired padding/margin
      setContentHeight(`${availableHeight}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <DashboardLayout title="Employee Network">
      <div
        className="relative flex items-center justify-center rounded-2xl overflow-hidden bg-white shadow-sm p-6 transition-all"
        style={{ height: contentHeight }}
      >
        {/* Foreground breathing content */}
        <div className="relative z-10">
          <BreathingComingSoon />
        </div>
      </div>
    </DashboardLayout>
  );
}
