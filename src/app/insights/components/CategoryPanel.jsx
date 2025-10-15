"use client";

import InsightsCard from "./InsightsCard";
import InsightsModal from "./InsightsModal";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CategoryPanel({
  title,
  stats,
  mostBrokenRulePercent,
  modalData,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl transition hover:scale-[1.01]"
      >
        <InsightsCard title={title}>
          <div className="space-y-3">
            {stats.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{s.label}</span>
                <span className="text-sm font-medium text-gray-800">
                  {s.value}
                </span>
              </div>
            ))}

            {/* Animated Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">
                  {
                    stats.find((s) => s.label === "Most Broken Rule")?.value ||
                    "Unknown"
                  }
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {mostBrokenRulePercent}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${mostBrokenRulePercent}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Click to view detailed analysis
            </p>
          </div>
        </InsightsCard>
      </button>

      {/* Modal */}
      <InsightsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        category={title}
        data={modalData}
      />
    </>
  );
}
